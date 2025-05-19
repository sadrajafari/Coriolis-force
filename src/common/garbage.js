function derivs(y, dydt, g, k, m, omega, coriolisEq) {
    if (coriolisEq) {
        dydt[0] = y[2];
        dydt[1] = y[3];
        dydt[2] = 2 * omega * y[3] + omega ** 2 * y[0];
        dydt[3] = -2 * omega * y[2] + omega ** 2 * y[1];
    } else {
        let speed = Math.sqrt(y[2] ** 2 + y[3] ** 2);
        dydt[0] = y[2];
        dydt[1] = y[3];
        dydt[2] = -(k / m) * y[2] * speed;
        dydt[3] = -g - (k / m) * y[3] * speed;
    }
    return dydt;
}

function rk4(y, h, g, k, m, omega, coriolisEq) {
    const N = 4;
    let h6 = h / 6.0;
    let hh = h * 0.5;
    let dydx = new Array(N).fill(0);
    let yt = new Array(N).fill(0);
    let dyt = new Array(N).fill(0);
    let dym = new Array(N).fill(0);
    let ynew = new Array(N).fill(0);

    dydx = derivs(y, dydx, g, k, m, omega, coriolisEq);

    for (let i = 0; i < N; i++) {
        yt[i] = y[i] + hh * dydx[i];
    }

    dyt = derivs(yt, dyt, g, k, m, omega, coriolisEq);
    for (let i = 0; i < N; i++) {
        yt[i] = y[i] + hh * dyt[i];
    }

    dym = derivs(yt, dym, g, k, m, omega, coriolisEq);
    for (let i = 0; i < N; i++) {
        yt[i] = y[i] + h * dym[i];
        dym[i] += dyt[i];
    }

    dyt = derivs(yt, dyt, g, k, m, omega, coriolisEq);

    for (let i = 0; i < N; i++) {
        ynew[i] = y[i] + h6 * (dydx[i] + dyt[i] + 2.0 * dym[i]);
    }

    return ynew;
}

function transformToInertial(x_r, y_r, theta) {
    let x_i = x_r * Math.cos(theta) - y_r * Math.sin(theta);
    let y_i = x_r * Math.sin(theta) + y_r * Math.cos(theta);
    return [x_i, y_i];
}

function findDistance(x, y) {
    return Math.sqrt(x ** 2 + y ** 2);
}

function tv(omega) {
    return omega * 200;
}

export function getGraphData(drag, dt, xinit, yinit, xdot, ydot, g, k, m, omega, equations, useEval, graphLen, graphVals, time, coriolisEq) {
    let t = 0;
    let y = [xinit, yinit, xdot, ydot];

    while (t < 10 && findDistance(y[0], y[1]) <= 200) {
        let theta = omega * t;
        let [xInertial, yInertial] = transformToInertial(y[0], y[1], theta);
        
        graphVals.insert(t, xInertial, yInertial, y[2], y[3], y[0], y[1], findDistance(xInertial, yInertial), tv(omega));
        
        y = rk4(y, dt, g, k, m, omega, coriolisEq);
        t += dt;
    }

    return graphVals;
}