
// import { DOM, Display, Input, VBox, Node, KeyboardUtils } from '../../../../scenery/js/imports.js';
import { DOM, Display, Input, VBox, Node, KeyboardUtils, Property, Emitter } from 'scenerystack';
// import DOM from '../../../../scenery/js/nodes/DOM.js';
// import Display from '../../../../scenery/js/display/Display.js';
// import Input from '../../../../scenery/js/input/Input.js';
// import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
// import Node from '../../../../scenery/js/nodes/Node.js';
// import KeyboardUtils from '../../../../scenery/js/accessibility/KeyboardUtils.js';
// import Property from '../../../../axon/js/Property.js';
import post from '../../common/postData.js';
// import {getInterface} from '../../common/mathquill.js'
// var MathQuill = require("../../common/mathquill.js");
export default class EquationInput extends Node {
  constructor(parentDomElement, options) {

    options = Object.assign({

      // can limit contents of the input
      inputType: 'text', // 'text' | 'number'

      domElement: null,
      xdotElement: null,
      ydotElement: null,
      v_ydotElement: null,
      v_xdotElement: null,

      onlyLetters: false,

      // number of characters if you want to customize
      width: null,

      // the initial text for the element
      initialText: '',

      equation: null,

      verifyEq: null,
      dom: null,
      // errField: null,

      linkObj: null,

      focusedEq: null

    }, options);

    super(options);

    this.valueSubmittedEmitter = new Emitter();
    this.writeToEquation = function (text) {
      this.mathField.write(text)
      // options.model[options.equation]= mathField.latex().replaceAll('\\theta',' t').replaceAll('\\omega',' o');
      // options.model.validEqs = options.verifyEq(domElement, options.model);

    }
    const domElement = parentDomElement;
    this.domElement = options.dom;
    const mathField = window.MathQuill.getInterface(2).MathField(domElement, {
      
      // const mathField = MathQuill.getInterface(2).MathField(domElement, {
      handlers: {
        edit: function () {
          
          options.model[options.equation] = mathField.latex().replaceAll('\\theta', ' t').replaceAll('\\Omega', ' o').replaceAll('\\pi', ' p').replaceAll('\\e', ' e');
          
          options.model.validEqs = options.verifyEq(options, options.model);
          setTimeout(() => post(options.model.name, "Changed " + options.model.value_changed, options.model.xProp.value, options.model.yProp.value, options.model.v_xProp.value, options.model.v_yProp.value, options.model.omegaProp.value, options.model.xEQ, options.model.yEQ, options.model.v_xEQ, options.model.v_yEQ), 10)
        },

      }
    });
  
    this.mathField = mathField;
    mathField.write(options.initialText);

    const equationInputNode = new Node();
    this.equationInputNode = domElement;
    
    const domElementDOM = new DOM(domElement, { allowInput: true });

    equationInputNode.addChild(domElementDOM);
    this.addChild(equationInputNode);


    this.disable = () => {
      this.mathField.blur();
    }

    window.addEventListener('pointerdown', (event) => {
      mathField.blur();
      // window.itemSelected = event.target;
      // if (event.target.id !== domElement.id) {
      //   this.disable()
      // }

    })


    // domElement.addEventListener('keyup', event => {
    //   if (event.code === phet.scenery.KeyboardUtils.KEY_ENTER) {

    //     this.valueSubmittedEmitter.emit(mathField.latex());

    //     mathField.blur();
    //   }
    // });


    this.domElement = domElement;
  }


  updateText(newLatex) {
    if (this.mathField) {
      // Set the raw LaTeX for display only
      this.mathField.latex(newLatex);
      // Do NOT set this.property.value here!
    }
  }
  

  getElementValue() {
    return this.mathField.latex()
  }


}



