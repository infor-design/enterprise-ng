import { Rule, SchematicContext, Tree, chain } from '@angular-devkit/schematics';
import { addAppModuleImport, addAssets, addScripts, addStylesheetToHead, addTsConfigTypes } from '../utils';
import { Schema } from './schema';

export function ngAdd(options: Schema): Rule {
    return chain([
        addIdsScripts(options),
        addIdsAssets(options),
        addIdsTypes(options),
        addIdsStylesheets(options),
        importIdsComponentsModule(options),
    ]);
}

function addIdsScripts(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding scripts');
        const scripts = [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/d3/dist/d3.min.js',
            './node_modules/ids-enterprise/dist/js/sohoxi.min.js',
        ];
        addScripts(tree, scripts, 'build', options.project);
        try {
            addScripts(tree, scripts, 'test', options.project);
        } catch (err) {
            context.logger.warn('Did not add test scripts. Assuming that project is configured to skip tests');
        }
    };
}

function addIdsAssets(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding assets');
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
        addAssets(tree, assets, 'build', options.project);
        try {
            addAssets(tree, assets, 'test', options.project);
        } catch (err) {
            context.logger.warn('Did not add test assets. Assuming that project is configured to skip tests');
        }
    };
}

function addIdsTypes(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding types to tsconfig');
        const types = ['jquery'];
        addTsConfigTypes(tree, types, 'build', options.project);
        try {
            addTsConfigTypes(tree, types, 'test', options.project);
        } catch (err) {
            context.logger.warn('Did not add test types. Assuming that project is configured to skip tests');
        }
    };
}

function addIdsStylesheets(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Adding stylesheet to index.html');
        addStylesheetToHead(tree, '/assets/ids-enterprise/css/theme-uplift-light.css', options.project, 'stylesheet');
    };
}

function importIdsComponentsModule(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Importing module');
        addAppModuleImport(tree, 'SohoComponentsModule', 'ids-enterprise-ng', options.project);
    };
}
