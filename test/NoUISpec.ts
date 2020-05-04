 

import  * as ae from ".." 
import { commons  , get   } from ".."
import { Array  } from "../array"
import {expect} from "chai"

 
import {  readdirSync} from "fs" 
import {resolve} from "path"
 
const get : get = {} as get 
const commons  : commons = {} as commons
const File : FileConstructor = {} as FileConstructor 

describe("Basic Tests", ()=>{

   /*beforeEach( () => ae.options.noui = true )  
    afterEach( () => ae.options.noui = false  )  
 */

it("Memory should gt 0 " ,  (done) => {
  
    
    //let file = path.resolve(dirname(__filename) , ".." , "Program" , "AfterEffects" , "App" , "Ae"  , "Support Files" ) 

    // ae.options.program = file 
    ae.options.noui = true
       ae.execute<string,number>(() => {
        
      
        return app.memoryInUse 
    }, "test").then(mem => {

        expect(mem).to.greaterThan(0,"memory should be greater than 0 ")  
        done()
    })
     
   

 })
 
    it("should write debug info to debug" ,  ()=>{ 
     
        let debugDir = resolve(process.cwd() , "debug")
        let files = readdirSync(debugDir) 
        ae.options.debug.dir = debugDir 
        ae.options.debug.enabled =  true 
        
        ae.executeSync ((params)=>{
           console.log(params.projectFile)
            let file = commons.convertPath(params.projectFile) 
        
            app.open( file ) 
            app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
            
         
        },{
            projectFile : resolve(__dirname,"..","ae-templates","sample-project.aep")
        }) 

        let files2 = readdirSync(debugDir) 
     
        expect(files.length).to.be.eq(files2.length - 1)
    })
  
    it("should return all items  as array", (done)=>{

 
        ae.execute  ((params)=>{
         
             let file = commons.convertPath(params.projectFile) 
         
             app.open( file ) 
             let allItems  = get().toArray()
              
             app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
             return {
                 itemsSize: allItems.length ,
            
             }
          
         },{
             projectFile : resolve(__dirname,"..","ae-templates","sample-project.aep")
         }).then(result =>{
            expect(result).not.to.be.undefined
            expect(result.itemsSize).not.to.be.null 
             
            expect(result.itemsSize).to.be.greaterThan(0) 
             
            done()
         })
        
     })
     it("should return all  layer as array", (done)=>{

        let debugDir = resolve(process.cwd() , "debug")
        
        ae.options.debug.dir = debugDir 
        ae.options.debug.enabled =  true 
        ae.execute  ((params)=>{
         
             let file = commons.convertPath(params.projectFile) 
            let layersize = 0 
             app.open( file ) 
             let comp1   = get.comps(/Comp 1/).first as CompItem
             let compItemAsArray = commons.toArray(comp1)
            if(comp1){
              let   layers =    commons.toArray(comp1.layers)
                layersize = layers.length 
            }
             app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
             return {
                 itemsSize: layersize , 
                 compItemAsArraySize : compItemAsArray.length
            
             }
          
         },{
             projectFile : resolve(__dirname,"..","ae-templates","sample-project.aep")
         }).then(result =>{
            expect(result).not.to.be.undefined
            expect(result.itemsSize).not.to.be.null 
            expect(result.compItemAsArraySize).not.to.be.null 
            expect(result.itemsSize).to.be.greaterThan(0) 
            expect(result.compItemAsArraySize).to.be.eq(1)
             
            done()
         })
        
     })

     it("should layer has ownproperty addComp", (done)=>{

        let debugDir = resolve(process.cwd() , "debug")
        
        ae.options.debug.dir = debugDir 
        ae.options.debug.enabled =  true 
        
      
        ae.execute  ((params)=>{
         
             let file = commons.convertPath(params.projectFile) 
            let hasOwnPropery = false  
             app.open( file ) 
             let layer = get.layers().first as Layer 
             
             if(layer ){
              
                hasOwnPropery = commons.has(layer,"activeAtTime")
             } 

             
             app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
             return {
                 hasOwnPropery : hasOwnPropery
                  
            
             }
          
         },{
             projectFile : resolve(__dirname,"..","ae-templates","sample-project.aep")
         }).then(result =>{
            expect(result).not.to.be.undefined
            expect(result.hasOwnPropery).not.to.be.null 
           
            expect(result.hasOwnPropery).to.be.eq(true)
             
            done()
         })
        
     })

     it("should layer name return from commons.get", (done)=>{
        //let a = [] 
        
        let debugDir = resolve(process.cwd() , "debug")
        ae.options.noui  = true 
        ae.options.debug.dir = debugDir 
        ae.options.debug.enabled =  true 
        ae.execute  ((params)=>{
         
             let file = commons.convertPath(params.projectFile) 
            let matchName  = null  
            let name = null
             app.open( file ) 
             let layer = get.layers().first as Layer 
            
             if(layer ){
             
                matchName = commons.get<string>(layer,"matchName"), 
                name = commons.get<string>(layer,"name")
             } 

             
             app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
             return {
                 matchName : matchName,
                 name : name 
                  
            
             }
          
         },{
             projectFile : resolve(__dirname,"..","ae-templates","sample-project.aep")
         }).then(result =>{
            expect(result).not.to.be.undefined
        expect(result.matchName).not.to.be.null 
        expect(result.name).not.to.be.null
        expect(result.name).to.be.eq("Light 1")
        expect(result.matchName).to.be.eq("ADBE Light Layer")
             
        done()
         })
        
     })

     it("array sink should return layers length  > 0 ", (done)=>{
        //let a = [] 
        
        let debugDir = resolve(process.cwd() , "debug")
        ae.options.noui  = true 
        ae.options.debug.dir = debugDir 
        ae.options.debug.enabled =  true 
        ae.execute  ((params)=>{
         
             let file = commons.convertPath(params.projectFile) 
            let matchName  = null  
            let name = null
             app.open( file ) 
             let layers = get.layers().toArray()
             let valuesLength = layers.sink(values => values.length)  

             

             
             app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
             return {
                 length : valuesLength
                  
            
             }
          
         },{
             projectFile : resolve(__dirname,"..","ae-templates","sample-project.aep")
         }).then(result =>{
            expect(result).not.to.be.undefined
        expect(result.length).not.to.be.null 
         
        expect(result.length).to.be.gt(0)
  
             
        done()
         })
        
     })
        
     })
