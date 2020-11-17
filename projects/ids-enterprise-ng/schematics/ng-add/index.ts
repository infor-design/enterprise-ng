import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { addAssets, addScripts, addStylesheetToHead, addTsConfigTypes, getWorkspace } from '../utils';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
    return chain([
        addIdsScripts(options),
        addIdsAssets(options),
        addIdsTypes(options),
        addIdsStylesheets(options),
    ]);
}

function addIdsScripts(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding scripts');
        const workspace = getWorkspace(tree);
        const scripts = [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/d3/dist/d3.min.js',
            './node_modules/ids-enterprise/dist/js/sohoxi.min.js',
        ];
        addScripts(tree, workspace, 'build', options.project, scripts);
        try {
            addScripts(tree, workspace, 'test', options.project, scripts);
        } catch (err) {
            context.logger.warn('Did not add test scripts. Assuming that project is configured to skip tests');
        }
    };
}

function addIdsAssets(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding assets');
        const workspace = getWorkspace(tree);
        const assets = [
            {
                'glob': '**/*',
                'input': './node_modules/ids-enterprise/dist/css',
                'output': '/assets/ids-enterprise/css'
            },
            {
                'glob': '**/*',
                'input': './node_modules/ids-enterprise/dist/js/cultures',
                'output': '/assets/ids-enterprise/js/cultures'
            },
        ];
        addAssets(tree, workspace, 'build', options.project, assets);
        try {
            addAssets(tree, workspace, 'test', options.project, assets);
        } catch (err) {
            context.logger.warn('Did not add test assets. Assuming that project is configured to skip tests');
        }
    };
}

function addIdsTypes(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding types to tsconfig');
        const workspace = getWorkspace(tree);
        const types = ['jquery'];
        addTsConfigTypes(tree, workspace, 'build', options.project, types);
        try {
            addTsConfigTypes(tree, workspace, 'test', options.project, types);
        } catch (err) {
            context.logger.warn('Did not add test types. Assuming that project is configured to skip tests');
        }
    };
}

function addIdsStylesheets(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding stylesheet to index.html');
        const workspace = getWorkspace(tree);
        addStylesheetToHead(tree, workspace, options.project, '/assets/ids-enterprise/css/light-theme.css', 'stylesheet');
    };
}
