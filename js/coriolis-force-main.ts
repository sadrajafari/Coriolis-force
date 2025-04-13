// Copyright 2025, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Sadra
 */

import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import CoriolisForceScreen from './coriolis-force/CoriolisForceScreen.js';
import CoriolisForceStrings from './CoriolisForceStrings.js';
import './common/CoriolisForceQueryParameters.js';

// Launch the sim. Beware that scenery Image nodes created outside simLauncher.launch() will have zero bounds
// until the images are fully loaded. See https://github.com/phetsims/coulombs-law/issues/70#issuecomment-429037461
simLauncher.launch( () => {

  const titleStringProperty = CoriolisForceStrings[ 'coriolis-force' ].titleStringProperty;

  const screens = [
    new CoriolisForceScreen( { tandem: Tandem.ROOT.createTandem( 'coriolisForceScreen' ) } )
  ];

  const options: SimOptions = {

    //TODO fill in credits, all of these fields are optional, see joist.CreditsNode
    credits: {
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      contributors: '',
      qualityAssurance: '',
      graphicArts: '',
      soundDesign: '',
      thanks: ''
    }
  };

  const sim = new Sim( titleStringProperty, screens, options );
  sim.start();
} );