var Dijkstra = function(source, destination, r){
  var createMatrix = function(rows, columns) {
    var created_matrix = new Array(rows);
    for (var i = 0; i < rows; i++){
      created_matrix[i] = new Array(columns);
    }
    return created_matrix;
  };

  var createArray = function(size) {
    var created_array = new Array(size);
    const tmp = created_array.length;
    for (var i = 0; i < tmp; i++){
      created_array[i] = 0;
    }
    return created_array;
  }

  var nodes = ( function(r) {
    var vec = [];
    for (var i = 0; i < r.length; i++) {
      for (var j = 0; j < 2; j++){
        vec.push(r[i][j]);
      }
    }

    function max(a,b){
      if(a > b) return a
      else return b
    }

    function maxN(list_A, list_B) {
      if(list_A == list_B) return vec[list_A];
      else m = parseInt((list_A + list_B) / 2);
      return max(maxN(list_A, m), maxN(m + 1, list_B));
    }

    return maxN(0, vec.length - 1)

  })(r)

  var matrix = r;
  const h = nodes + 1;
  var Road = createMatrix(h, h);
  var R = createArray(h);
  var F = createArray(h);
  var S = createArray(h);
  const Infinity_Limit = 100000;
  var src = source;
  var dst = destination;
  var output = [];

  var get = function(node) {
    if(F[node]) get(F[node])
    output.push( node )
  },getCost = function() {
    return (R[dst])
  },getShortestPath = function() {
    get(dst);
    return output;
  },read = (function() {
    var n = r.length, x, y, cost;
    for (var i = 1; i <= nodes; i++) {
      for (var j = 1; j <= nodes; j++) {
        if (i == j) Road[i][j] = 0;
        else Road[i][j] = Infinity_Limit;
      }
    }
    for (var i = 0; i < n; i++) {
      x = matrix[i][0];
      y = matrix[i][1];
      cost = matrix[i][2];
      Road[x][y] = cost;
    }
  })(),
  solve = (function() {
    var min, posMin;
    S[src] = 1;
    for (var i = 1; i <= nodes; i++) {
      R[i] = Road[src][i];
      if(src != i)
        if(R[i] < Infinity_Limit)
          F[i] = src;
    }

    for (var i = 1; i <= nodes-1; i++) {
      min = Infinity_Limit;
      for (var k = 1; k <= nodes; k++) {
        if(S[k] == 0)
          if(R[k] < min) {
            min = R[k];
            posMin = k;
          }
      }

      S[posMin] = 1
      for (var j = 1; j <= nodes; j++) {
        if(S[j] == 0)
          if(R[j] > R[posMin] + Road[posMin][j]) {
            R[j] = R[posMin] + Road[posMin][j];
            F[j] = posMin;
          }
        }
      }
    })();

    return {getCost: getCost, getShortestPath: getShortestPath}
}

module.exports = Dijkstra
