function monochrome(imageData, resultData, colors) {
  var d = [];
  var min = 765;
  var max = 0;
  for (var i = 0; i < imageData.data.length; i += 4) {
    var v = imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2];
    if (v < min) min = v;
    if (v > max) max = v;
    d.push(v);
  }
  var divider = max - min || 1;
  var interpolator = colors.length - 1;
  function transform(v) {
    return (Math.round((v - min) / divider * interpolator));
  }
  var data = d.map(transform);
  for (var i = 0; i < resultData.data.length; i += 4) {
    resultData.data[i] = colors[data[i / 4]][0];
    resultData.data[i + 1] = colors[data[i / 4]][1];
    resultData.data[i + 2] = colors[data[i / 4]][2];
    resultData.data[i + 3] = colors[data[i / 4]][3];
  }
  return (resultData);
}

function polychrome(imageData, resultData, colors) {
  var dR;
  var dG;
  var dB;
  var dist;
  var nearest;
  var colorIndex;
  for (var i = 0; i < imageData.data.length; i += 4) {
    nearest = 195075;
    for (var c = 0; c < colors.length; ++c) {
      dR = imageData.data[i] - colors[c][0];
      dG = imageData.data[i + 1] - colors[c][1];
      dB = imageData.data[i + 2] - colors[c][2];
      dist = dR * dR + dG * dG + dB * dB;
      if (dist < nearest) {
        nearest = dist;
        colorIndex = c;
      }
    }
    resultData.data[i] = colors[colorIndex][0];
    resultData.data[i + 1] = colors[colorIndex][1];
    resultData.data[i + 2] = colors[colorIndex][2];
    resultData.data[i + 3] = colors[colorIndex][3];
  }
  return (resultData);
}

onmessage = function(e) {
  var filter = e.data[0];
  var imageData = e.data[1];
  var resultData = e.data[2];
  postMessage(filter.monochrome
    ? monochrome(imageData, resultData, filter.colors)
    : polychrome(imageData, resultData, filter.colors)
  );
};
