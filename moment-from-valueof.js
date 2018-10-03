import _ from 'lodash'
import moment from 'moment'
import clone from 'clone'
/*
given an object convert all properties that look like moments

object -
options={
newObject:false,
propNameMatcher : new RegExp("utc"),
toFormat:default null | moment format string all values will be converted to this format
newProperty:defult null -
            | {
            name:string, //if this is provided prefix and postfix will be ignored
            prefix:string,
            postfix}}

}
*/
var defaultOptions = {
  newObject:true,
  propNameMatcher : (v)=> new RegExp("utc").test(v),
  toFormat:null,
  newProperty: null,
}
var momentFromValueOf = (obj,op=defaultOptions)=>{

  let options = Object.assign({},defaultOptions,op),
  propMatcher = setupPropMatcher(options),
  valueMatcher = setupValueMatcher(options),
  converter = setupConverter(options),
  o = options.newObject?clone(obj):obj
  return recurse(o,propMatcher,valueMatcher,converter)
}

var recurse = (obj,propMatcher,valueMatcher,converter) =>{
  if ( typeof obj === "object"){
    _.keys(obj).map(k=>{
      if (!obj.hasOwnProperty(k)) return
      if (typeof obj[k] === 'object' && !moment.isMoment(obj[k]))
        recurse(obj[k],propMatcher,valueMatcher,converter)
      else if (propMatcher && propMatcher(k))
       converter(obj,k)
    })
  }
  return obj
}
var setupPropMatcher = (options)=>{
  return (x)=> options.propNameMatcher.test(x)
}
var setupValueMatcher = (options)=>{
  return null
}
var setupConverter = (options)=>{
  return (obj,k)=>{

    let v = obj[k],
    i = parseInt(v)
    if (!i && !moment.isMoment(v)) return

    let m = i ? moment(i) : v
    if (options.toFormat)
      m = m.format(options.toFormat)

    handleNewPropName(obj,k,m,options)
}
}

var handleNewPropName = (obj,k,m,options)=>{

  if (!options.newProperty)
    obj[k]=m
  else{
    if (options.newProperty.name)
    obj[options.newProperty.name]=m
    else{
      if (!options.newProperty.prefix) options.newProperty.prefix =""
      if (!options.newProperty.postfix) options.newProperty.postfix =""
      let newPropName = [options.newProperty.prefix,k,options.newProperty.postfix].join('')
      obj[newPropName]=m

  }
  }
}
module.exports = momentFromValueOf
export default momentFromValueOf
