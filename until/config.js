/**
 * Created by hp on 2017/1/26.
 */
let opt=require("./config.installdev.json");
let loader=require('./config.loaders.js');
let fs=require("fs");
let path=require("path");
let def=path.dirname(require.resolve('szq-template'));


let getInstalldev=()=>{
    let devs={};

    if(!opt) return devs;
    for(let type in opt){
           let option=opt[type]['options'];

           for(let i=0;i<option.length;i++){

             let type=option[i]["packages"];
             for(let i=0;i<type.length;i++){
                    devs[type[i].name]=type[i].version;
             };

         }
    }
/*console.log(devs);*/

    return devs;

};

let  getLoaders=()=>{
        return loader?loader:null;
};

let setLoader=()=>{

   let config=((loader)=>{
        let loaders=[];
        for(let k in loader){
            let type=loader[k];
            for(let i in type){
              /*  if(i==this.props.style){
                    //let Extract='Extract'+this.props.style;
                    let Extract=new ExtractTextPlugin('./app/style/app.css')
                    let l=type[i].split('!');
                    loaders.push(Extract(l));
                }*/
                loaders.push(type[i]);
            }
        } ;

        return loaders;

    })(getLoaders());
/*    var w_data = new Buffer(JSON.stringify(config));
    fs.appendFileSync(def+'/cfg/default.js',w_data);*/

};

module.exports={
    getInstalldev,
    getLoaders,
    setLoader
};