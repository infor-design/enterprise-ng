import { Tree, SchematicsException } from '@angular-devkit/schematics';
import { json } from '@angular-devkit/core';
import { ProjectType, WorkspaceProject, WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { SourceFile, ScriptTarget, createSourceFile } from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';

type WorkspaceTarget = 'build' | 'test';
type WorkspaceScript = string;
type WorkspaceAsset = string | { glob: string; input: string; output: string; };
interface TSConfig {
    compilerOptions?: {
        types?: string[];
    };
}

export function addScripts(tree: Tree, scripts: WorkspaceScript[], target?: WorkspaceTarget, projectName?: string) {
    const workspace = getWorkspace(tree);
    const options = getProjectOptions(workspace, target, projectName);
    if (!options.scripts) {
        options.scripts = scripts;
    } else {
        for (const script of scripts) {
            if (!options.scripts.includes(script)) {
                options.scripts.push(script);
            }
        }
    }
    writeWorkspace(tree, workspace);
}

export function addAssets(tree: Tree, assets: WorkspaceAsset[], target?: WorkspaceTarget, projectName?: string) {
    const workspace = getWorkspace(tree);
    const options = getProjectOptions(workspace, target, projectName);
    if (!options.assets) {
        options.assets = assets;
    } else {
        const existingAssetInputs = (options.assets as WorkspaceAsset[]).map(a => typeof a === 'string' ? a : a.input);
        for (const asset of assets) {
            const assetInput = typeof asset === 'string' ? asset : asset.input;
            if (!existingAssetInputs.includes(assetInput)) {
                options.assets.push(asset);
            }
        }
    }
    writeWorkspace(tree, workspace);
}

export function addTsConfigTypes(tree: Tree, types: string[], target?: WorkspaceTarget, projectName?: string) {
    const workspace = getWorkspace(tree);
    const options = getProjectOptions(workspace, target, projectName);
    if (!options.tsConfig || typeof options.tsConfig !== 'string') {
        throw new SchematicsException(`Cannot determine tsconfig for project ${projectName}`);
    }
    const tsConfig = readJson<TSConfig>(tree, options.tsConfig);
    if (!tsConfig.compilerOptions) {
        tsConfig.compilerOptions = {};
    }
    if (!tsConfig.compilerOptions.types) {
        tsConfig.compilerOptions.types = types;
    } else {
        for (const type of types) {
            if (!tsConfig.compilerOptions.types.includes(type)) {
                tsConfig.compilerOptions.types.push(type);
            }
        }
    }
    writeJson(tree, options.tsConfig, tsConfig);
}

export function addStylesheetToHead(tree: Tree, href: string, projectName?: string, id?: string) {
    const workspace = getWorkspace(tree);
    const options = getProjectOptions(workspace, 'build', projectName);
    if (!options.index) {
        throw new SchematicsException(`Cannot determine index.html for project ${projectName}`);
    }
    const indexHtml = tree.read(options.index);
    if (!indexHtml) {
        throw new SchematicsException(`Cannot read file ${options.index}`);
    }
    let linkTag: string;
    if (id) {
        linkTag = `<link rel="stylesheet" id="${id}" href="${href}" type="text/css">`;
    } else {
        linkTag = `<link rel="stylesheet" href="${href}" type="text/css">`;
    }
    if (!indexHtml.toString().includes(linkTag)) {
        const modified = indexHtml.toString().replace(/(<\/head>)/, `  ${linkTag}\n$1`);
        tree.overwrite(options.index, modified);
    }
}

export function addAppModuleImport(tree: Tree, moduleName: string, modulePath: string, projectName?: string): void {
    const workspace = getWorkspace(tree);
    const mainPath = getProjectOptions(workspace, 'build', projectName).main;
    if (!mainPath) {
        throw new SchematicsException(`Cannot read the main entry-point (usually src/main.ts)`);
    }
    const appModulePath = getAppModulePath(tree, mainPath);
    const appModuleSource = getSourceFile(tree, appModulePath);
    const changes = addImportToModule(appModuleSource, appModulePath, moduleName, modulePath);
    const recorder = tree.beginUpdate(appModulePath);
    applyToUpdateRecorder(recorder, changes);
    tree.commitUpdate(recorder);
}

function getSourceFile(tree: Tree, path: string): SourceFile {
    const buffer = tree.read(path);
    if (!buffer) {
        throw new SchematicsException(`Could not find ${path}`);
    }
    const source = createSourceFile(path, buffer.toString(), ScriptTarget.Latest, true);
    return source;
}

function getWorkspace(tree: Tree): WorkspaceSchema {
    const workspace = readJson<WorkspaceSchema>(tree, '/angular.json');
    return workspace;
}

function writeWorkspace(tree: Tree, workspace: WorkspaceSchema) {
    // tree.overwrite('/angular.json', toJson(workspace));
    writeJson(tree, '/angular.json', workspace);
}

function getProjectOptions(workspace: WorkspaceSchema, target: WorkspaceTarget = 'build', projectName = workspace.defaultProject) {
    const project = workspace.projects[projectName];
    if (!isApplicationProject(project)) {
        throw new SchematicsException(`Project ${projectName} is not an Application project`);
    } else {
        return project.architect[target].options;
    }

    function isApplicationProject(p: WorkspaceProject): p is WorkspaceProject<ProjectType.Application> {
        return p.projectType === ProjectType.Application;
    }
}

function readJson<T>(tree: Tree, path: string) {
    const file = tree.read(path);
    if (!file) {
        throw new SchematicsException(`File ${path} does not exist`);
    }
    return fromJson<T>(file.toString());
}

function writeJson(tree: Tree, path: string, obj: any) {
    tree.overwrite(path, toJson(obj));
}
/**
 * JSON.parse(), but it can handle JSON with comments.
 */
function fromJson<T>(jsonWithComments: string): T {
    return json.parseJson(jsonWithComments, json.JsonParseMode.CommentsAllowed) as unknown as T;
}

function toJson(obj: any): string {
    return JSON.stringify(obj, null, 2);
}
