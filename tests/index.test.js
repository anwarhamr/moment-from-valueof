import moment from 'moment'
import momentFromValueOf  from '../src/moment-from-valueof'

test('replaces utc single level',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment().valueOf(),
   oit = {utc:time},
  result = momentFromValueOf(oit)
  expect(result.utc.valueOf()).toBe(time);
});
test('replaces utc multiple level',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment().valueOf(),
   oit = {utc:time,utc2:{utc:time}},
  result = momentFromValueOf(oit)
  expect(result.utc.valueOf()).toBe(time);
  expect(result.utc2.utc.valueOf()).toBe(time);
});
test('replaces utc single level with format',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment().valueOf(),
   oit = {utc:time},
   options =  {
     toFormat:"YYYY",
   },
  result = momentFromValueOf(oit,options)
  expect(result.utc).toBe(moment(time).format(options.toFormat));
});
test('replaces utc single level with format is already moment obj',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment(),
   oit = {utc:time},
   options =  {
     toFormat:"YYYY",
   };
  let result = momentFromValueOf(oit,options)
  expect(result.utc).toBe(time.format(options.toFormat));
});
test('options newObject false works',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment().valueOf(),
   oit = {utc:time},
   options =  {
     newObject:false,
   },
  result = momentFromValueOf(oit,options)
  expect(result).toBe(oit);
});

test('options newObject true works',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment().valueOf(),
   oit = {utc:time},
   options =  {
     newObject:true,
   },
  result = momentFromValueOf(oit,options)
  expect(result).not.toBe(oit);
});
test('options newPropName works',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment().valueOf(),
   oit = {utc:time},
   options =  {
     newProperty:{name:"newProp"},
   },
  result = momentFromValueOf(oit,options)
  expect(result.utc.valueOf()).toBe(time);
  expect(result[options.newProperty.name].valueOf()).toBe(time);
});

test('options newPropName prefix works',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment().valueOf(),
   oit = {utc:time},
   options =  {
     newProperty:{prefix:"pre"},
   },
  result = momentFromValueOf(oit,options)
  expect(result.utc.valueOf()).toBe(time);
  expect(result['preutc'].valueOf()).toBe(time);
});
test('options newPropName postfix works',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment().valueOf(),
   oit = {utc:time},
   options =  {
     newProperty:{postfix:"post"},
   },
  result = momentFromValueOf(oit,options)
  expect(result.utc.valueOf()).toBe(time);
  expect(result['utcpost'].valueOf()).toBe(time);
});
test('options newPropName pre & postfix works',()=>{
  // reducer should do the sorting and so we should ask for the first thing in the list.
  let time =moment().valueOf(),
   oit = {utc:time},
   options =  {
     newProperty:{prefix:"pre",postfix:"post",},
   },
  result = momentFromValueOf(oit,options)
  expect(result.utc.valueOf()).toBe(time);
  expect(result['preutcpost'].valueOf()).toBe(time);
});

test('readme example',()=>{
  let time =moment().valueOf(),
   ops = {
  newObject:true,
    toFormat:"YYYY-MM-DD hh:mm",
    newProperty:{ postfix:"String"}
  },
  obj = {utc:time,utc2:{utc:time}}
  let  displayObj = momentFromValueOf(obj,ops);
  console.log(obj,displayObj);
  //{ utc: 1538605304767, utc2: { utc: 1538605304767 } } { utc: '2018-10-03 04:21', utc2: { utc: '2018-10-03 04:21' } }
})
