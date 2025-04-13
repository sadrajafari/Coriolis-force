export class simData {
    constructor(interval) {
        this.data = [];
        this.interval = interval;
        this.id = Math.random();
    }


    insert(time, xI, yI, v_xI, v_yI, x, y, cor, cen, v_x, v_y) {
        // console.log(time,x,y,v_x,v_y)
        this.data.push(new dataPoint(time, xI, yI, v_xI, v_yI, x, y, cor, cen, v_x, v_y));
    }
    getX(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }

        return this.data[dataIndex].x;
    }
    getY(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }

        return this.data[dataIndex].y;
    }
    getCen(time) {
        let dataIndex = (time / this.interval).toFixed(0);

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }
        // console.log(Math.sqrt(Math.pow(this.data[dataIndex].y, 2) + Math.pow(this.data[dataIndex].x, 2)))
        return this.data[dataIndex].cen
    }
    getCor(time){
        let dataIndex = (time / this.interval).toFixed(0);

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }
        // console.log(Math.sqrt(Math.pow(this.data[dataIndex].y, 2) + Math.pow(this.data[dataIndex].x, 2)))
        // console.log(this.data[dataIndex])
        // console.log(this.data[dataIndex].omega * 200)
        return this.data[dataIndex].cor
    }
    getXI(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }

        return this.data[dataIndex].xI;
    }
    getYI(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length - 1;
            // return 0;
        }

        return this.data[dataIndex].yI;
    }
    getV_X(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        //console.log(dataIndex)

        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length-1;
            // return 0;
        }

        return this.data[dataIndex].v_x;
    }

    getV_Y(time) {
        let dataIndex = (time / this.interval).toFixed(0);
        if (dataIndex > this.data.length - 1) {
            dataIndex = this.data.length-1;
            // return 0;
        }
        return this.data[dataIndex].v_y;
    }


}

class dataPoint {
    constructor(time, xI, yI, v_xI, v_yI, x, y, cor, cen,v_x, v_y) {
        // this.time = time;
        // this.x = x;
        // this.y = y;
        // this.v_xI = v_xI;
        // this.v_yI = v_yI;
        // this.xI = xI;
        // this.yI = yI;
        // this.cor = cor;
        // this.cen = cen;
        // this.v_x = v_x;
        // this.v_y = v_y;
        this.time = time;
        this.x = xI;
        this.y = yI;
        this.v_xI = v_xI;
        this.v_yI = v_yI;
        this.xI = x;
        this.yI = y;
        this.cor = cor;
        this.cen = cen;
        this.v_x = v_x;
        this.v_y = v_y;
        // console.log(v_x,v_y)

    }
}
