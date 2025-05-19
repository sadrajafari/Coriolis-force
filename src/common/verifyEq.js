// import { simData } from "./simData"

export function verifyEq( options,model ){
 let xbool = testX(options.xdotElement,model,options.equation);
 let vxbool = testVX(options.v_xdotElement,model,options.equation);
 let ybool = testY(options.ydotElement,model,options.equation);
 let vybool = testVY(options.v_ydotElement,model,options.equation);
//  console.log(xbool,vxbool,ybool,vybool)
 return  xbool && vxbool && ybool && vybool
}

function testX(element,model,type){
  // //console.log(model.velocityEQ)
  if (model.xEQ === ''){
    if (Object.hasOwn(element, 'domElement')) {
      element.domElement.classList.remove('error');
      //console.log("NO ERROR")
    } else{
      element.classList.remove('error');
      //console.log("NO ERROR")
  
    }
    return true;
  }
  let vx = model.v_x;
  let vy = model.v_y;
  let x = model.x
  let y = model.y
  let k = model.k;
  let m = model.mass;
  let g = model.gravity;
  let o = model.omega
  let result;
  let result2;
  try{
    const eq = globalThis.window.evaluatex(model.xEQ, {k:k,g:g,v_x:vx,v_y:vy,m:m,x:x,y:y,o:o}, {latex:true});
    result = eq({});
    

  } catch (err){
    console.log(err)
    if (type !== 'xEQ'){
      return
    }
    // element.innerHTML="[BAD OR NO EQUATION INPUTED]";
    // element.text = "[BAD OR NO EQUATION INPUTED]";
    if (Object.hasOwn(element, 'domElement')){ // change to just be velocity elemnt
      //console.log("ERROR")
      element.domElement.classList.add('error');
    } else{
      element.classList.add('error');
    }
    // model.graphDataTest = new simData(.05)

    return false;
  }
  if (Object.hasOwn(element, 'domElement')) {
    element.domElement.classList.remove('error');
    //console.log("NO ERROR")
  } else{
    element.classList.remove('error');
    //console.log("NO ERROR")

  }
  return true;// change to just be velocity elemnt
}
function testVX(element,model,type ){
  //console.log('i actually ran')
  if (model.v_xEQ === ''){
    if (Object.hasOwn(element, 'domElement')) {
      element.domElement.classList.remove('error');
      //console.log("NO ERROR")
    } else{
      element.classList.remove('error');
      //console.log("NO ERROR")
  
    }
    return true;
  }
  let vx = model.x;
  let vy = model.y;
  let k = model.k;
  let m = model.mass;
  let g = model.gravity;
  let x = model.x
  let o = model.omega

  let y = model.y
  let result;
  let result2;
  try{
    const eq = globalThis.window.evaluatex(model.v_xEQ, {k:k,g:g,v_x:vx,v_y:vy,m:m,x:x,y:y,o:o}, {latex:true});
    result = eq({});
    

  } catch (err){
    //console.log(err)
    if (type !== 'v_xEQ'){
      return
    }
    // element.innerHTML="[BAD OR NO EQUATION INPUTED]";
    // element.text = "[BAD OR NO EQUATION INPUTED]";
    if (Object.hasOwn(element, 'domElement')){ // change to just be velocity elemnt
      //console.log("ERROR")
      element.domElement.classList.add('error');
    } else{
      element.classList.add('error');
    }
    // model.graphDataTest = new simData(.05)

    return false;
  }
  if (Object.hasOwn(element, 'domElement')) {
    element.domElement.classList.remove('error');
    //console.log("NO ERROR")
  } else{
    element.classList.remove('error');
    //console.log("NO ERROR")

  }
  return true;// change to just be velocity elemnt
}

function testY(element,model ,type){
  // //console.log(model.velocityEQ)
  // //console.log('test',model.yEQ)
  if (model.yEQ === ''){
    if (Object.hasOwn(element, 'domElement')) {
      element.domElement.classList.remove('error');
      //console.log("NO ERROR")
    } else{
      element.classList.remove('error');
      //console.log("NO ERROR")
  
    }
    return true;
  }
  let vx = model.x;
  let vy = model.y;
  let k = model.k;
  let m = model.mass;
  let x = model.x
  let y = model.y
  let o = model.omega

  let g = model.gravity;
  let result;
  let result2;
  try{
    const eq = globalThis.window.evaluatex(model.yEQ, {k:k,g:g,v_x:vx,v_y:vy,m:m,x:x,y:y,o:o}, {latex:true});
    result = eq({});
    

  } catch (err){
    //console.log(err)
    if (type !== 'yEQ'){
      return
    }
    // element.innerHTML="[BAD OR NO EQUATION INPUTED]";
    // element.text = "[BAD OR NO EQUATION INPUTED]";
    if (Object.hasOwn(element, 'domElement')){ // change to just be velocity elemnt
      //console.log("ERROR")
      element.domElement.classList.add('error');
    } else{
      element.classList.add('error');
    }
    // model.graphDataTest = new simData(.05)

    return false;
  }
  if (Object.hasOwn(element, 'domElement')) {
    element.domElement.classList.remove('error');
    //console.log("NO ERROR")
  } else{
    element.classList.remove('error');
    //console.log("NO ERROR")

  }
  return true;// change to just be velocity elemnt
}
function testVY(element,model ,type){
  // //console.log(model.velocityEQ)
  if (model.v_yEQ === ''){
    if (Object.hasOwn(element, 'domElement')) {
      element.domElement.classList.remove('error');
      //console.log("NO ERROR")
    } else{
      element.classList.remove('error');
      //console.log("NO ERROR")
  
    }
    return true;
  }
  let vx = model.x;
  let vy = model.y;
  let k = model.k;
  let x = model.x
  let y = model.y
  let o = model.omega

  let m = model.mass;
  let g = model.gravity;
  let result;
  let result2;
  try{
    const eq = globalThis.window.evaluatex(model.v_yEQ, {k:k,g:g,v_x:vx,v_y:vy,m:m,x:x,y:y,o:o}, {latex:true});
    result = eq({});
    

  } catch (err){
    //console.log(err)
    if (type !== 'v_yEQ'){
      return
    }
    // element.innerHTML="[BAD OR NO EQUATION INPUTED]";
    // element.text = "[BAD OR NO EQUATION INPUTED]";
    if (Object.hasOwn(element, 'domElement')){ // change to just be velocity elemnt
      //console.log("ERROR")
      element.domElement.classList.add('error');
    } else{
      element.classList.add('error');
    }
    // model.graphDataTest = new simData(.05)

    return false;
  }
  if (Object.hasOwn(element, 'domElement')) {
    element.domElement.classList.remove('error');
    //console.log("NO ERROR")
  } else{
    element.classList.remove('error');
    //console.log("NO ERROR")

  }
  return true;// change to just be velocity elemnt
}