import { Simbolo } from "./Simbolo";

class Entorno{
    private variables:Simbolo[];
    private padre:Entorno;

    constructor(padre:Entorno){
        this.padre = padre;
        this.variables = [];
    }

    public getEntornoGlobal():Entorno{
        let ent:Entorno = this;
        while(ent.padre != null){
            ent = ent.padre;
        }
        return ent;
    }

    public get(id:string):Simbolo{
        let tmp:Entorno = this;
        while(tmp != null){
            for(let aux of tmp.variables){
                if(aux.getId() == id){
                    return aux;
                }
            }
            tmp = tmp.padre;
        }
        return tmp;
    }

    public put(simbolo:Simbolo):boolean{
        for(let aux of this.variables){
            if(aux.getId() == simbolo.getId()){
                return false;
            }
        }
        this.variables.push(simbolo);
        return true;
    }
}

export { Entorno }