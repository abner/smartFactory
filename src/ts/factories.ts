declare var Factory;
declare var faker;

module smartFactory {

  export class FactoryWrapper{
    static factory: any = Factory;

    wrappedFactory: any;
    name: string;


    public static define(name: String, constructor?: Function):  FactoryWrapper{
      var fac: FactoryWrapper =  new FactoryWrapper();
      fac.wrappedFactory = <FactoryWrapper>this.factory.define(name, constructor);
      return fac;
    }

    public static build(name: string, attributes?: any[], options?: Object): Object {
      return this.factory.build(name, attributes, options);
    }

    public static buildList(name: string, size: number, attributes: any[], options: Object): Object[] {
      return this.factory.build(name, size, attributes, options);
    }

    public static attributes(attributes: Object, options: Object): Object {
      return this.factory.attributes(attributes, options);
    }

    public static options(options: Object): Object {
      return this.factory.options(options);
    }

    public static extend(name: string){
      return this.factory.extend(name);
    }

    public static for(target: any) : smartFactory.FactoryFacilities {
      if(((<any>target).__rosieFactoryName__) &&  ((<any>target).factory)) {
        return (<smartFactory.IConstructorWithFactory>(<any>target)).factory;
      } else {
        throw new Error('no factory registered for ' + target.toString() + ' please check!');
      }
    }

    attr(name: string, dependencies: string[], value: any): FactoryWrapper {
      this.wrappedFactory = (<FactoryWrapper>this.wrappedFactory).attr(name, dependencies, value);
      return this;
    }

    sequence(name: string, dependencies?: string[], builder?: Function) : FactoryWrapper {
      this.wrappedFactory = (<FactoryWrapper>this.wrappedFactory).sequence(name, dependencies, builder);
      return this;
    }

  }

  export class Service {

    constructor() {
      return FactoryWrapper;
    }



  }

}
if(angular && faker && Factory){
  angular.module('smartFactory', []).service('Factory', smartFactory.Service);
} else {
  if(console && console.error){
    if(!angular){
        console.error('ngFactories not registered beacuse angular is missing');
    }
    if(!faker){
        console.error('ngFactories not registered beacuse faker.js is missing');
    }
    if(!Factory){
        console.error('ngFactories not registered beacuse angular rosie is missing');
    }
  }
}
