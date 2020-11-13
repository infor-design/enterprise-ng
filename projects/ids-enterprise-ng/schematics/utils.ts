import { Tree, SchematicsException } from '@angular-devkit/schematics';
import { experimental, json } from '@angular-devkit/core';

export class Workspace {
    static read(tree: Tree): Workspace {
        const workspaceConfig = tree.read('/angular.json');
        if (!workspaceConfig) {
            throw new SchematicsException('Could not find Angular workspace configuration');
        }
        const workspace = fromJson<experimental.workspace.WorkspaceSchema>(workspaceConfig.toString());
        return new Workspace(tree, workspace);
    }

    private constructor(private tree: Tree, private ws: experimental.workspace.WorkspaceSchema) { }

    write() {
        this.tree.overwrite('/angular.json', toJson(this.ws));
    }

    getProject(name?: string): Project {
        name = name || this.ws.defaultProject;
        if (!name) {
            throw new Error('Could not determine project from workspace configuration');
        }
        const project = this.ws.projects[name];
        return new Project(this.tree, project);
    }
}

export type ProjectTarget = 'build' | 'test';
export interface TSConfig {
    compilerOptions?: {
        types?: string[];
    };
}

export class Project {
    constructor(private tree: Tree, private project: experimental.workspace.WorkspaceProject) { }

    getTsConfig(target: ProjectTarget): TSConfig {
        const tsConfigPath = this.getOptions(target).tsConfig;
        const tsConfig = this.tree.read(tsConfigPath);
        if (!tsConfig) {
            throw new Error(`Could not find tsconfig for target '${target}'`);
        }
        return fromJson<TSConfig>(tsConfig.toString());
    }

    writeTsConfig(target: ProjectTarget, tsconfig: TSConfig) {
        this.tree.overwrite(this.getOptions(target).tsConfig, toJson(tsconfig));
    }

    getIndexHtml(target: ProjectTarget) {
        const indexHtmlPath = this.getOptions(target).index;
        const indexHtml = this.tree.read(indexHtmlPath);
        if (!indexHtml) {
            throw new Error(`Could not find index.html for target '${target}'`);
        }
        return indexHtml.toString();
    }

    writeIndexHtml(target: ProjectTarget, content: string) {
        this.tree.overwrite(this.getOptions(target).index, content);
    }

    addScripts(target: ProjectTarget, scripts: string[]) {
        const options = this.getOptions(target);
        if (!options.scripts) {
            options.scripts = [];
        }
        options.scripts.push(...scripts);
    }

    addAssets(target: ProjectTarget, assets: unknown[]) {
        const options = this.getOptions(target);
        if (!options.assets) {
            options.assets = [];
        }
        options.assets.push(...assets);
    }

    private getOptions(target: ProjectTarget) {
        const options = this.project.architect?.[target]?.options;
        if (!options) {
            throw new Error(`Could not find options for architect target '${target}'`);
        }
        return options;
    }
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
