// Copyright 2025, University of Colorado Boulder

/**
 * Defines query parameters that are specific to this simulation.
 * Run with ?log to print query parameters and their values to the browser console at startup.
 *
 * @author Sadra
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import coriolisForce from '../coriolisForce.js';

const CoriolisForceQueryParameters = QueryStringMachine.getAll( {
  //TODO add schemas for query parameters
} );

coriolisForce.register( 'CoriolisForceQueryParameters', CoriolisForceQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.coriolisForce.CoriolisForceQueryParameters' );

export default CoriolisForceQueryParameters;