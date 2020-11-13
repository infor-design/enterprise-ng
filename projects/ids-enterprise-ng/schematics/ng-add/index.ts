import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { Workspace } from '../utils';

export function ngAdd(options: Schema): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const workspace = Workspace.read(tree);
        const project = workspace.getProject(options.project);

        context.logger.info('Adding scripts');
        const scripts = [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/d3/dist/d3.min.js',
            './node_modules/ids-enterprise/dist/js/sohoxi.min.js',
        ];
        project.addScripts('build', scripts);
        try {
            project.addScripts('test', scripts);
        } catch (err) {
            context.logger.warn('Did not add test scripts. Assuming that project is configured to skip tests');
        }

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
        project.addAssets('build', assets);
        try {
            project.addAssets('test', assets);
        } catch (err) {
            context.logger.warn('Did not add test assets. Assuming that project is configured to skip tests');
        }

        workspace.write();

        context.logger.info('Adding types to tsconfig');
        const types = ['jquery'];
        const tsConfig = project.getTsConfig('build');
        if (!tsConfig.compilerOptions) {
            tsConfig.compilerOptions = {};
        }
        if (!tsConfig.compilerOptions.types) {
            tsConfig.compilerOptions.types = [];
        }
        tsConfig.compilerOptions.types.push(...types);
        project.writeTsConfig('build', tsConfig);

        try {
            const tsConfigTest = project.getTsConfig('test');
            if (!tsConfigTest.compilerOptions) {
                tsConfigTest.compilerOptions = {};
            }
            if (!tsConfigTest.compilerOptions.types) {
                tsConfigTest.compilerOptions.types = [];
            }
            tsConfigTest.compilerOptions.types.push(...types);
            project.writeTsConfig('test', tsConfigTest);
        } catch (err) {
            context.logger.warn('Did not add types to test tsconfig. Assuming that project is configured to skip tests');
        }

        context.logger.info('Adding stylesheet to index.html');
        const indexHtml = project.getIndexHtml('build');
        const linkTag = `<link rel="stylesheet" id="stylesheet" href="/assets/ids-enterprise/css/light-theme.css" type="text/css">`;
        const modified = indexHtml.replace(/(<\/head>)/, `  ${linkTag}\n$1`);
        project.writeIndexHtml('build', modified);

        return tree;
    };
}
