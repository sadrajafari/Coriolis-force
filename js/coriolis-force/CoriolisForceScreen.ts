// Copyright 2025, University of Colorado Boulder

/**
 * TODO Describe this class and its responsibilities.
 *
 * @author Sadra
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import optionize from '../../../phet-core/js/optionize.js';
import CoriolisForceColors from '../common/CoriolisForceColors.js';
import coriolisForce from '../coriolisForce.js';
import CoriolisForceStrings from '../CoriolisForceStrings.js';
import CoriolisForceModel from './model/CoriolisForceModel.js';
import CoriolisForceScreenView from './view/CoriolisForceScreenView.js';

type SelfOptions = {
  //TODO add options that are specific to CoriolisForceScreen here
};

type CoriolisForceScreenOptions = SelfOptions & ScreenOptions;

export default class CoriolisForceScreen extends Screen<CoriolisForceModel, CoriolisForceScreenView> {

  public constructor( providedOptions: CoriolisForceScreenOptions ) {

    const options = optionize<CoriolisForceScreenOptions, SelfOptions, ScreenOptions>()( {
      name: CoriolisForceStrings.screen.nameStringProperty,

      //TODO add default values for optional SelfOptions here

      //TODO add default values for optional ScreenOptions here
      backgroundColorProperty: CoriolisForceColors.screenBackgroundColorProperty
    }, providedOptions );

    super(
      () => new CoriolisForceModel( { tandem: options.tandem.createTandem( 'model' ) } ),
      model => new CoriolisForceScreenView( model, { tandem: options.tandem.createTandem( 'view' ) } ),
      options
    );
  }
}

coriolisForce.register( 'CoriolisForceScreen', CoriolisForceScreen );