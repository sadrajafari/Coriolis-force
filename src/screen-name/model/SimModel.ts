
// import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
// import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
// import TModel from '../../../../joist/js/TModel.js';
import { Property } from 'scenerystack';
import { simData } from '../../common/simData.js';
import { getGraphData } from '../../common/rk4testing.js'
import post from '../../common/postData.js';
import makeid from '../../common/randomStringGenerator.js';
// import evaluatex from 'evaluatex';

export class SimModel {

  k: number;
  x: number;
  y: number;
  v_x: number;
  v_y: number;
  omega: number;
  kProp: Property<number>;
  gravityProp: Property<number>;
  yProp: Property<number>;
  v_xProp: Property<number>;
  v_yProp: Property<number>;
  omegaProp: Property<number>;
  timer: number;
  quadraticDrag: boolean;
  mass: number;
  gravity: number;
  graphLen: number;
  originalLen: number;
  graphUpdateInterval: number;
  graphData: any;
  massProp: Property<number>;
  simSpeed: number;
  simSpeedProp: Property<number>;
  xProp: Property<number>;
  resetDisableProb: Property<boolean>;
  public name: string | undefined | null;
  public action: any



  public xEQ: string;
  public yEQ: string;
  public v_xEQ: string;
  public v_yEQ: string;
  public xFunc;
  public yFunc;
  public v_xFunc;
  public v_yFunc;
  public graphData: simData;
  public graphDataTest: simData;
  public graphLen: number;
  public graphUpdateInterval: number;
  public graphLenTest: number;
  public prevX: number;
  public resetDisable: boolean;
  coriolisEq: boolean;
  showForceVectors: boolean;
  showRefForceVectors: boolean;
  showTestForceVectors: boolean;
  showForceProp: Property<boolean>;
  showRefForceProp: Property<boolean>;
  showTestForceProp: Property<boolean>;
  frameCount: number;
  trailForceVectors: boolean;
  trailForceVectorsProp: Property<boolean>;
  trailRefForceVectors: boolean;
  trailTestForceVectors: boolean;
  trailRefForceVectorsProp: Property<boolean>;
  trailTestForceVectorsProp: Property<boolean>;


  public constructor(providedOptions: CoriolisForceModelOptions) {
    this.frameCount = 1
    this.k = 0;
    this.gravity = 9.8;
    this.x = 0;
    this.y = 0;
    this.v_x = 10;
    this.v_y = 0;
    this.omega = .5;
    this.mass = 1;
    this.timer = 0;
    this.quadraticDrag = true;
    this.graphLen = 5;
    this.originalLen = 0;
    this.graphUpdateInterval = .001;
    this.simSpeed = 1;
    this.coriolisEq = true;
    this.graphData = new simData(this.graphUpdateInterval)
    this.graphDataTest = new simData(this.graphUpdateInterval)
    this.showForceVectors = true;
    this.showRefForceVectors = true;
    this.showTestForceVectors = true;
    this.showRefForceVectors = true;
    this.showTestForceVectors = true;
    this.trailForceVectors = false;
    this.trailRefForceVectors = false;
    this.trailTestForceVectors = false;
    this.resetDisable = false;


    this.kProp = new Property(this.k);
    this.xProp = new Property(this.x);
    this.yProp = new Property(this.y);
    this.v_xProp = new Property(this.v_x);
    this.v_yProp = new Property(this.v_y);
    this.omegaProp = new Property(this.omega);
    this.massProp = new Property(this.mass);
    this.graphData = new simData(this.graphUpdateInterval);
    // console.log(this.graphData)
    this.simSpeedProp = new Property(this.simSpeed);
    this.showForceProp = new Property(!this.showForceVectors);
    this.showRefForceProp = new Property(!this.showRefForceVectors);
    this.showTestForceProp = new Property(!this.showTestForceVectors);
    this.trailForceVectorsProp = new Property(!this.trailForceVectors);
    this.trailRefForceVectorsProp = new Property(!this.trailRefForceVectors);
    this.trailTestForceVectorsProp = new Property(!this.trailTestForceVectors);
    this.resetDisableProb = new Property(this.resetDisable);
    this.graphData = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {}, false, this.graphLen, this.graphData, this.timer, this.coriolisEq);
    this.action = "start"
    // console.log(this.graphData)
    // console.log(this.y)
    let prevX = this.x
    let prevY = this.y
    this.xProp.link((val) => {
      if (Math.sqrt(Math.pow(val, 2) + Math.pow(this.yProp.value, 2)) > 175) {
        // console.log('it is still in the circle');
        // prevX = val; // Update the previous valid value
        this.resetDisableProb.value = true
      }
      else {
        this.resetDisableProb.value = false
      }
      // else {
      //   console.log('xProp exceeds the circle boundary');
      //   this.xProp.value = prevX; // Revert to the previous valid value
      // }
    });

    this.yProp.link((val) => {
      if (Math.sqrt(Math.pow(val, 2) + Math.pow(this.xProp.value, 2)) > 175) {
        // console.log('it is still in the circle2');
        // prevY = val; // Update the previous valid value
        this.resetDisableProb.value = true
        // console.log('yProp exceeds the circle boundary')
      }
      else {
        this.resetDisableProb.value = false
        // console.log('yProp is in the circle')
      }
      // else {
      //   console.log('yProp exceeds the circle boundary');
      //   this.yProp.value = prevY; // Revert to the previous valid value
      // }
    });

    // this.xProp.link((val) => {
    //   if (Math.sqrt(Math.pow(val - 200, 2) + Math.pow(this.yProp.value, 2)) <= 200) {
    //     prevX = val
    //     this.xProp.value = val
    //     this.x = val
    //   } else {
    //     this.xProp.value = prevX
    //     this.x = this.xProp.value
    //   }
    // });
    // this.yProp.link((val) => {
    //   if (Math.sqrt(Math.pow(this.xProp.value - 200, 2) + Math.pow(val, 2)) <= 200) {
    //     prevY = val
    //     this.yProp.value = val
    //     this.y = val
    //   } else {
    //     this.yProp.value = this.y
    //     this.y = this.yProp.value
    //   }
    // });



    if (document.cookie) {

    } else {
      document.cookie = `name=${this.name ? this.name : "unknown"}` + ` id=${makeid(20)}`
    }


    if (new URL(window.location.href).searchParams.get("formula") === 'true') {
      this.xEQ = 'v_x'
      this.yEQ = 'v_y'
      this.v_xEQ = '2\\cdot o\\cdot v_y+o^2\\cdot x'
      this.v_yEQ = '-2\\cdot o\\cdot v_x+o^2\\cdot y'
      // this.v_xEQ = '-\\frac{k}{m}\\cdot v_x\\cdot\\sqrt{v_x^2+v_y^2}'
      // this.v_yEQ = '-g-\\frac{k}{m}\\cdot v_y\\cdot\\sqrt{v_x^2+v_y^2}'

      this.xFunc = evaluatex(this.xEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
      this.yFunc = evaluatex(this.yEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
      this.v_xFunc = evaluatex(this.v_xEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
      this.v_yFunc = evaluatex(this.v_yEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
      // this.xFunc = globalThis.window.evaluatex(this.xEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
      // this.yFunc = globalThis.window.evaluatex(this.yEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
      // this.v_xFunc = globalThis.window.evaluatex(this.v_xEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
      // this.v_yFunc = globalThis.window.evaluatex(this.v_yEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });

      this.graphDataTest = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, { v_xdot: this.v_xFunc, v_yFunc: this.v_yEQ, xdot: this.xFunc, ydot: this.yFunc }, true, this.graphLen, this.graphData, this.timer, this.coriolisEq);

    } else {
      this.xEQ = ''
      this.yEQ = ''
      this.v_xEQ = ''
      this.v_yEQ = ''
      this.graphDataTest = new simData(this.graphUpdateInterval)
      this.graphDataTest.insert(0, 0, 0, 0, 0, 0, 0)


    }

    this.graphData = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {}, false, this.graphLen, this.graphData, this.timer);
    this.graphLen = this.graphData.data.length * this.graphUpdateInterval;
    this.graphLenTest = this.graphDataTest.data.length * this.graphUpdateInterval;
    const thisAlt = this;
  }
  public reset(value_changed = ""): void {
    // console.log(this.y)
    // console.log(this.yProp.value)
    this.frameCount = 0
    this.k = this.kProp.value;
    this.x = this.xProp.value;
    this.y = this.yProp.value;
    this.v_x = this.v_xProp.value;
    this.v_y = this.v_yProp.value;
    this.omega = this.omegaProp.value;
    this.mass = this.massProp.value;
    this.timer = 0;
    this.quadraticDrag = true;
    this.graphLen = 5;
    this.originalLen = 0;
    this.graphUpdateInterval = .001;
    this.simSpeed = this.simSpeedProp.value;
    this.graphData = new simData(this.graphUpdateInterval);
    // console.log(this.xEQ)
    // console.log(this.yEQ)
    // console.log(this.v_xEQ)
    // console.log(this.v_yEQ)


    // this.graphDataTest = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {v_xdot:this.v_xFunc,v_yFunc:this.v_yEQ,xdot:this.xFunc,ydot:this.yFunc}, true, this.graphLen, this.graphData, this.timer);
    // if (this.validEqs) {
    if (true) {
      if (this.xEQ === '' || this.yEQ === '' || this.v_xEQ === '' || this.v_yEQ === '') {
        this.graphDataTest = new simData(this.graphUpdateInterval)
        this.graphDataTest.insert(0, 0, 0, 0, 0, 0, 0)
      } else {
        // console.log('VYYY:',this.v_yEQ)
        this.xFunc = evaluatex(this.xEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
        this.yFunc = evaluatex(this.yEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
        this.v_xFunc = evaluatex(this.v_xEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
        this.v_yFunc = evaluatex(this.v_yEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
        // this.xFunc = globalThis.window.evaluatex(this.xEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
        // this.yFunc = globalThis.window.evaluatex(this.yEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
        // this.v_xFunc = globalThis.window.evaluatex(this.v_xEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
        // this.v_yFunc = globalThis.window.evaluatex(this.v_yEQ, { k: this.k, m: this.mass, g: this.gravity, o: this.omega, p: Math.PI, e: Math.E }, { latex: true });
        // this.graphDataTest = getGraphData(this.quadraticDrag,this.graphUpdateInterval, this.x, this.y,this.y,angle, this.v_x, this.v_y, this.gravity, this.k,this.mass, {v_xdot:this.v_xFunc,v_ydot:this.v_yFunc,xdot:this.xFunc,ydot:this.yFunc}, true, this.graphLen, this.graphDataTest, this.timer);
        this.graphDataTest = new simData(this.graphUpdateInterval);

        this.graphDataTest = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, { v_xdot: this.v_xFunc, v_ydot: this.v_yFunc, xdot: this.xFunc, ydot: this.yFunc }, true, this.graphLen, this.graphDataTest, this.timer, this.coriolisEq);

      }


    } else {
      this.graphDataTest = new simData(this.graphUpdateInterval);
      this.graphDataTest.insert(0, 0, 0, 0, 0, 0, 0)
    }
    this.graphData = getGraphData(this.quadraticDrag, this.graphUpdateInterval, this.x, this.y, this.v_x, this.v_y, this.gravity, this.k, this.mass, this.omega, {}, false, this.graphLen, this.graphData, this.timer, this.coriolisEq);
    // console.log(this.graphData)
    // console.log(this.graphData)
    this.graphLenTest = this.graphDataTest.data.length * this.graphUpdateInterval;
    this.graphLen = this.graphData.data.length * this.graphUpdateInterval;
    if (value_changed !== "") {
      value_changed === "Start" ? this.action = "" : null
      setTimeout(() => post(this.name, value_changed, this.xProp.value, this.yProp.value, this.v_xProp.value, this.v_yProp.value, this.omegaProp.value, this.xEQ, this.yEQ, this.v_xEQ, this.v_yEQ), 10)
    }

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public step(_dt: number): void {
    // Called every frame, with the time since the last frame in seconds
  }
}
