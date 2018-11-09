interface SohoStatic {
  renderLoop: SohoRenderLoop;
}

interface SohoConfig {
  renderLoop: SohoConfigRenderLoop;
}

interface SohoRenderLoop {
  start: Function;
  stop: Function;
  register: Function;
  unregister: Function;
}

interface SohoConfigRenderLoop {
  noAutoStart: boolean;
}

declare var Soho: SohoStatic;
declare var SohoConfig: SohoConfig;
