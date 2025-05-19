
/**
 * 
 *
 * @author Sadra Jafari Ghalehkohneh
 */

// import { RichText, Text, VBox } from '../../../../scenery/js/imports.js';
import { RichText, Tandem } from 'scenerystack';
import {VBox} from 'scenerystack/scenery'
import { Dialog } from 'scenerystack/sim';
// import Dialog from '../../../../sun/js/Dialog.js';
// import Tandem from '../../../../tandem/js/Tandem.js';
// import coriolisForce from '../../coriolisForce.js';


const MAX_WIDTH = 800; 

export default class DiscreteInfoDialog extends Dialog {

  public constructor( tandem: Tandem ) {

    const titleText = new RichText( "Guide For Writing In The Equation Boxes", {
      maxWidth: MAX_WIDTH
    } );

    
    const stringProperties = [
      "<sub>Square root: <i>\\sqrt{expression}</i></sub>",
      "<sub>N-th root: <i>\\nthroot{expression}</i></sub>",
      "<sub>Fraction: Enter the numerator, then press <i>/</i> to move to the denominator.</sub>",
      "<sub>Exponent: x^2 (Type <i>^</i> after the base value)</sub>",
      "<sub>Subscript: x_1 (Type <i>_</i> after the base value)</sub>",
      "<sub>Multiplication dot: Press <i>Shift + 8</i></sub>",
      "<sub>Parentheses: () (Press <i>Shift + 9</i> for ( and <i>Shift + 0</i> for ))</sub>",
      "<sub>Pi (π): <i>\\pi</i></sub>",
      "<sub>Sum: <i>+</i></sub>",
      "<sub>Subtraction: <i>-</i></sub>"
    ];

    
    const children = stringProperties.map( stringProperty => new RichText( stringProperty ) );

    const content = new VBox( {
      children: children,
      align: 'left',
      spacing: 11
    } );

    super( content, {
      title: titleText,
      xSpacing: 30,
      tandem: tandem,
      phetioReadOnly: true
    } );
  }
}

