export function getColor(route) {
  const hexes = {
    orange: '#FC642B',
    blue: '#2B53AA',
    lightGreen: '#6FBC4D',
    brown: '#986638',
    gray: '#A7A9AC',
    green: '#139240',
    yellow: '#FBCB31',
    red: '#EB3736'
  };

  const colorLookup = {
    D: 'orange',
    B: 'orange',
    A: 'blue',
    C: 'blue',
    E: 'blue',
    F: 'orange',
    M: 'orange',
    J: 'brown',
    G: 'lightGreen',
    L: 'gray',
    '4': 'green',
    '5': 'green',
    '6': 'green',
    '1': 'red',
    '2': 'red',
    '3': 'red',
    N: 'yellow',
    Q: 'yellow',
    R: 'yellow',
    W: 'yellow'
  };
  const humanReadableColor = colorLookup[route];
  const hex = hexes[humanReadableColor];
  return hex;
}

// shadeBlend is stolen from StackOverflow https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
export function shadeBlend(p, c0, c1) {
  var n = p < 0 ? p * -1 : p,
    u = Math.round,
    w = parseInt;
  if (c0.length > 7) {
    var f = c0.split(','),
      t = (c1 ? c1 : p < 0 ? 'rgb(0,0,0)' : 'rgb(255,255,255)').split(','),
      R = w(f[0].slice(4)),
      G = w(f[1]),
      B = w(f[2]);
    return (
      'rgb(' +
      (u((w(t[0].slice(4)) - R) * n) + R) +
      ',' +
      (u((w(t[1]) - G) * n) + G) +
      ',' +
      (u((w(t[2]) - B) * n) + B) +
      ')'
    );
  } else {
    var f = w(c0.slice(1), 16),
      t = w((c1 ? c1 : p < 0 ? '#000000' : '#FFFFFF').slice(1), 16),
      R1 = f >> 16,
      G1 = (f >> 8) & 0x00ff,
      B1 = f & 0x0000ff;
    return (
      '#' +
      (0x1000000 +
        (u(((t >> 16) - R1) * n) + R1) * 0x10000 +
        (u((((t >> 8) & 0x00ff) - G1) * n) + G1) * 0x100 +
        (u(((t & 0x0000ff) - B1) * n) + B1)
      )
        .toString(16)
        .slice(1)
    );
  }
}
