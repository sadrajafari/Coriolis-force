
/**
 * 
 *
 * @author Sadra Jafari Ghalehkohneh
 */

import { RichText, Tandem, TextPushButton } from 'scenerystack';
import {VBox} from 'scenerystack/scenery'
import { Dialog } from 'scenerystack/sim';



const MAX_WIDTH = 800; 

export default class DiscreteInfoDialog extends Dialog {

  public constructor( tandem: Tandem,
    onFillEquations?: ( equations: { x: string; y: string; v_x: string; v_y: string } ) => void
   ) {

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
     const fillEquationsButton = new TextPushButton( 'Fill Correct Equations', {
      listener: () => {
        const correctEquations = {
          x: 'v_x',           // ẋ' = v_x
          y: 'v_y',           // ẏ' = v_y
          v_x: '2\\cdot o\\cdot v_y+o^2\\cdot x',  // v̇_x' = -2Ωv_y + Ω²x
          v_y: '-2\\cdot o\\cdot v_x+o^2\\cdot y'    // v̇_y' = 2Ωv_x + Ω²y
        };

        if ( onFillEquations ) {
          onFillEquations( correctEquations );
        }
        console.log( 'Filled all equations with correct values' );
      }
    } );

    const content = new VBox( {
      children: [...children, fillEquationsButton],
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

