// Copyright 2025, University of Colorado Boulder

/**
 * Defines the colors for this sim.
 *
 * All simulations should have a Colors.js file, see https://github.com/phetsims/scenery-phet/issues/642.
 *
 * For static colors that are used in more than one place, add them here.
 *
 * For dynamic colors that can be controlled via colorProfileProperty.js, add instances of ProfileColorProperty here,
 * each of which is required to have a default color. Note that dynamic colors can be edited by running the sim from
 * phetmarks using the "Color Edit" mode.
 *
 * @author Sadra
 */

import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import coriolisForce from '../coriolisForce.js';

const CoriolisForceColors = {

  // Background color for screens in this sim
  screenBackgroundColorProperty: new ProfileColorProperty( coriolisForce, 'background', {
    default: 'white'
  } )
};

coriolisForce.register( 'CoriolisForceColors', CoriolisForceColors );
export default CoriolisForceColors;