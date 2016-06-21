(function(global) {

	// map tells the System loader where to look for things
	var map = {
		'app':                        './', // 'dist',
		'rxjs':                       'node_modules/rxjs',
		'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
		'@angular':                   'node_modules/@angular'
	};

	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app':                        { main: 'main.js',  defaultExtension: 'js' },
		'rxjs':                       { defaultExtension: 'js' },
		'angular2-in-memory-web-api': { defaultExtension: 'js' }
	};

	var packageNames = [
		'common',
		'compiler',
		'core',
		'forms',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'router-deprecated',
		'testing',
		'upgrade'
	];

	function packageBundles(pkgName) {
		// TODO: no bundles directories seem to exist in the @angular/pkgName
		packages['@angular/' + pkgName] = {main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js'};
	}

	function packageIndex(pkgName) {
		packages['@angular/' + pkgName] = {main: 'index.js', defaultExtension: 'js'};
	}

	// Most environments should use UMD; some (Karma) need the individual index files
	var packageConfig = packageIndex; //System.packageWithIndex ? packageIndex : packageBundles;
	packageNames.forEach(packageConfig);

	var config = {
		map: map,
		packages: packages
	};

	// filterSystemConfig - index.html's chance to modify config before we register it.
	if (global.filterSystemConfig) {
		global.filterSystemConfig(config);
	}

	System.config(config);

})(this);
