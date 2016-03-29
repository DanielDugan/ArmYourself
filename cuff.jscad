// title      : ArmYourself Cuff
// author     : Daniel Dugan
// license    : MIT License
// revision   : 0.001
// tags       : Hack-a-day
// file       : cuff.jscad

function main(params) {
  var cone = CSG.cylinder({
    start: [0, params.length, 0],
    end: [0, 0, 0],
    radiusStart: params.c1,
    radiusEnd: params.c2,
    resolution: params.resolution
  });
    cone = hollowOutInside(cone, params);
  return cone;
}

function hollowOutInside(cone, params) {
  var inside = CSG.cylinder({
    start: [0, params.length+1, 0],
    end: [0, params.thickness, 0],
    radiusStart:    params.c1-params.thickness,                
    radiusEnd:      params.c2-params.thickness,
    resolution: params.resolution
  });
  cone = cone.subtract(inside);
  return cone;
}

function getParameterDefinitions() {
  return [{
    name: 'length',
    caption: 'Upper Arm Length:',
    type: 'float',
    default: 100
  }, {
    name: 'c1',
    caption: 'Back Circumference (Closest to shoulder):',
    type: 'float',
    default: 40
  }, {
    name: 'c2',
    caption: 'Front Circumference (Closest to elbow):',
    type: 'float',
    default: 25
  }, {
    name: 'resolution',
    caption: 'resolution',
    type: 'int',
    default: 64
  }, {
    name: 'thickness',
    caption: 'thickness',
    type: 'float',
    default: 3
  }];
}
