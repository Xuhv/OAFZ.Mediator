var Se = Object.defineProperty;
var we = (n, m, e) => m in n ? Se(n, m, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[m] = e;
var M = (n, m, e) => (we(n, typeof m != "symbol" ? m + "" : m, e), e);
import q, { Component as Oe } from "react";
function Ae(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var ue = { exports: {} }, ae, de;
function fe() {
  if (de)
    return ae;
  de = 1;
  var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ae = n, ae;
}
var ie, ge;
function Le() {
  if (ge)
    return ie;
  ge = 1;
  var n = fe();
  function m() {
  }
  function e() {
  }
  return e.resetWarningCache = m, ie = function() {
    function r(f, p, E, v, u, d) {
      if (d !== n) {
        var T = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw T.name = "Invariant Violation", T;
      }
    }
    r.isRequired = r;
    function l() {
      return r;
    }
    var i = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: l,
      element: r,
      elementType: r,
      instanceOf: l,
      node: r,
      objectOf: l,
      oneOf: l,
      oneOfType: l,
      shape: l,
      exact: l,
      checkPropTypes: e,
      resetWarningCache: m
    };
    return i.PropTypes = i, i;
  }, ie;
}
var Q = { exports: {} }, w = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ve;
function _e() {
  return ve || (ve = 1, process.env.NODE_ENV !== "production" && function() {
    var n = typeof Symbol == "function" && Symbol.for, m = n ? Symbol.for("react.element") : 60103, e = n ? Symbol.for("react.portal") : 60106, r = n ? Symbol.for("react.fragment") : 60107, l = n ? Symbol.for("react.strict_mode") : 60108, i = n ? Symbol.for("react.profiler") : 60114, f = n ? Symbol.for("react.provider") : 60109, p = n ? Symbol.for("react.context") : 60110, E = n ? Symbol.for("react.async_mode") : 60111, v = n ? Symbol.for("react.concurrent_mode") : 60111, u = n ? Symbol.for("react.forward_ref") : 60112, d = n ? Symbol.for("react.suspense") : 60113, T = n ? Symbol.for("react.suspense_list") : 60120, L = n ? Symbol.for("react.memo") : 60115, C = n ? Symbol.for("react.lazy") : 60116, _ = n ? Symbol.for("react.block") : 60121, R = n ? Symbol.for("react.fundamental") : 60117, $ = n ? Symbol.for("react.responder") : 60118, j = n ? Symbol.for("react.scope") : 60119;
    function N(a) {
      return typeof a == "string" || typeof a == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      a === r || a === v || a === i || a === l || a === d || a === T || typeof a == "object" && a !== null && (a.$$typeof === C || a.$$typeof === L || a.$$typeof === f || a.$$typeof === p || a.$$typeof === u || a.$$typeof === R || a.$$typeof === $ || a.$$typeof === j || a.$$typeof === _);
    }
    function I(a) {
      if (typeof a == "object" && a !== null) {
        var B = a.$$typeof;
        switch (B) {
          case m:
            var G = a.type;
            switch (G) {
              case E:
              case v:
              case r:
              case i:
              case l:
              case d:
                return G;
              default:
                var pe = G && G.$$typeof;
                switch (pe) {
                  case p:
                  case u:
                  case C:
                  case L:
                  case f:
                    return pe;
                  default:
                    return B;
                }
            }
          case e:
            return B;
        }
      }
    }
    var s = E, W = v, z = p, J = f, V = m, K = u, Z = r, ee = C, re = L, H = e, te = i, Y = l, U = d, X = !1;
    function ne(a) {
      return X || (X = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), t(a) || I(a) === E;
    }
    function t(a) {
      return I(a) === v;
    }
    function c(a) {
      return I(a) === p;
    }
    function P(a) {
      return I(a) === f;
    }
    function h(a) {
      return typeof a == "object" && a !== null && a.$$typeof === m;
    }
    function g(a) {
      return I(a) === u;
    }
    function x(a) {
      return I(a) === r;
    }
    function y(a) {
      return I(a) === C;
    }
    function b(a) {
      return I(a) === L;
    }
    function k(a) {
      return I(a) === e;
    }
    function A(a) {
      return I(a) === i;
    }
    function S(a) {
      return I(a) === l;
    }
    function D(a) {
      return I(a) === d;
    }
    w.AsyncMode = s, w.ConcurrentMode = W, w.ContextConsumer = z, w.ContextProvider = J, w.Element = V, w.ForwardRef = K, w.Fragment = Z, w.Lazy = ee, w.Memo = re, w.Portal = H, w.Profiler = te, w.StrictMode = Y, w.Suspense = U, w.isAsyncMode = ne, w.isConcurrentMode = t, w.isContextConsumer = c, w.isContextProvider = P, w.isElement = h, w.isForwardRef = g, w.isFragment = x, w.isLazy = y, w.isMemo = b, w.isPortal = k, w.isProfiler = A, w.isStrictMode = S, w.isSuspense = D, w.isValidElementType = N, w.typeOf = I;
  }()), w;
}
var O = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ye;
function Ne() {
  if (ye)
    return O;
  ye = 1;
  var n = typeof Symbol == "function" && Symbol.for, m = n ? Symbol.for("react.element") : 60103, e = n ? Symbol.for("react.portal") : 60106, r = n ? Symbol.for("react.fragment") : 60107, l = n ? Symbol.for("react.strict_mode") : 60108, i = n ? Symbol.for("react.profiler") : 60114, f = n ? Symbol.for("react.provider") : 60109, p = n ? Symbol.for("react.context") : 60110, E = n ? Symbol.for("react.async_mode") : 60111, v = n ? Symbol.for("react.concurrent_mode") : 60111, u = n ? Symbol.for("react.forward_ref") : 60112, d = n ? Symbol.for("react.suspense") : 60113, T = n ? Symbol.for("react.suspense_list") : 60120, L = n ? Symbol.for("react.memo") : 60115, C = n ? Symbol.for("react.lazy") : 60116, _ = n ? Symbol.for("react.block") : 60121, R = n ? Symbol.for("react.fundamental") : 60117, $ = n ? Symbol.for("react.responder") : 60118, j = n ? Symbol.for("react.scope") : 60119;
  function N(s) {
    if (typeof s == "object" && s !== null) {
      var W = s.$$typeof;
      switch (W) {
        case m:
          switch (s = s.type, s) {
            case E:
            case v:
            case r:
            case i:
            case l:
            case d:
              return s;
            default:
              switch (s = s && s.$$typeof, s) {
                case p:
                case u:
                case C:
                case L:
                case f:
                  return s;
                default:
                  return W;
              }
          }
        case e:
          return W;
      }
    }
  }
  function I(s) {
    return N(s) === v;
  }
  return O.AsyncMode = E, O.ConcurrentMode = v, O.ContextConsumer = p, O.ContextProvider = f, O.Element = m, O.ForwardRef = u, O.Fragment = r, O.Lazy = C, O.Memo = L, O.Portal = e, O.Profiler = i, O.StrictMode = l, O.Suspense = d, O.isAsyncMode = function(s) {
    return I(s) || N(s) === E;
  }, O.isConcurrentMode = I, O.isContextConsumer = function(s) {
    return N(s) === p;
  }, O.isContextProvider = function(s) {
    return N(s) === f;
  }, O.isElement = function(s) {
    return typeof s == "object" && s !== null && s.$$typeof === m;
  }, O.isForwardRef = function(s) {
    return N(s) === u;
  }, O.isFragment = function(s) {
    return N(s) === r;
  }, O.isLazy = function(s) {
    return N(s) === C;
  }, O.isMemo = function(s) {
    return N(s) === L;
  }, O.isPortal = function(s) {
    return N(s) === e;
  }, O.isProfiler = function(s) {
    return N(s) === i;
  }, O.isStrictMode = function(s) {
    return N(s) === l;
  }, O.isSuspense = function(s) {
    return N(s) === d;
  }, O.isValidElementType = function(s) {
    return typeof s == "string" || typeof s == "function" || s === r || s === v || s === i || s === l || s === d || s === T || typeof s == "object" && s !== null && (s.$$typeof === C || s.$$typeof === L || s.$$typeof === f || s.$$typeof === p || s.$$typeof === u || s.$$typeof === R || s.$$typeof === $ || s.$$typeof === j || s.$$typeof === _);
  }, O.typeOf = N, O;
}
var he;
function Te() {
  return he || (he = 1, process.env.NODE_ENV === "production" ? Q.exports = Ne() : Q.exports = _e()), Q.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var se, be;
function $e() {
  if (be)
    return se;
  be = 1;
  var n = Object.getOwnPropertySymbols, m = Object.prototype.hasOwnProperty, e = Object.prototype.propertyIsEnumerable;
  function r(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function l() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var f = {}, p = 0; p < 10; p++)
        f["_" + String.fromCharCode(p)] = p;
      var E = Object.getOwnPropertyNames(f).map(function(u) {
        return f[u];
      });
      if (E.join("") !== "0123456789")
        return !1;
      var v = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        v[u] = u;
      }), Object.keys(Object.assign({}, v)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return se = l() ? Object.assign : function(i, f) {
    for (var p, E = r(i), v, u = 1; u < arguments.length; u++) {
      p = Object(arguments[u]);
      for (var d in p)
        m.call(p, d) && (E[d] = p[d]);
      if (n) {
        v = n(p);
        for (var T = 0; T < v.length; T++)
          e.call(p, v[T]) && (E[v[T]] = p[v[T]]);
      }
    }
    return E;
  }, se;
}
var oe, me;
function Re() {
  return me || (me = 1, oe = Function.call.bind(Object.prototype.hasOwnProperty)), oe;
}
var le, Ce;
function Ie() {
  if (Ce)
    return le;
  Ce = 1;
  var n = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var m = fe(), e = {}, r = Re();
    n = function(i) {
      var f = "Warning: " + i;
      typeof console < "u" && console.error(f);
      try {
        throw new Error(f);
      } catch {
      }
    };
  }
  function l(i, f, p, E, v) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in i)
        if (r(i, u)) {
          var d;
          try {
            if (typeof i[u] != "function") {
              var T = Error(
                (E || "React class") + ": " + p + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw T.name = "Invariant Violation", T;
            }
            d = i[u](f, u, E, p, null, m);
          } catch (C) {
            d = C;
          }
          if (d && !(d instanceof Error) && n(
            (E || "React class") + ": type specification of " + p + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof d + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), d instanceof Error && !(d.message in e)) {
            e[d.message] = !0;
            var L = v ? v() : "";
            n(
              "Failed " + p + " type: " + d.message + (L ?? "")
            );
          }
        }
    }
  }
  return l.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (e = {});
  }, le = l, le;
}
var ce, Pe;
function je() {
  if (Pe)
    return ce;
  Pe = 1;
  var n = Te(), m = $e(), e = fe(), r = Re(), l = Ie(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(p) {
    var E = "Warning: " + p;
    typeof console < "u" && console.error(E);
    try {
      throw new Error(E);
    } catch {
    }
  });
  function f() {
    return null;
  }
  return ce = function(p, E) {
    var v = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function d(t) {
      var c = t && (v && t[v] || t[u]);
      if (typeof c == "function")
        return c;
    }
    var T = "<<anonymous>>", L = {
      array: $("array"),
      bigint: $("bigint"),
      bool: $("boolean"),
      func: $("function"),
      number: $("number"),
      object: $("object"),
      string: $("string"),
      symbol: $("symbol"),
      any: j(),
      arrayOf: N,
      element: I(),
      elementType: s(),
      instanceOf: W,
      node: K(),
      objectOf: J,
      oneOf: z,
      oneOfType: V,
      shape: ee,
      exact: re
    };
    function C(t, c) {
      return t === c ? t !== 0 || 1 / t === 1 / c : t !== t && c !== c;
    }
    function _(t, c) {
      this.message = t, this.data = c && typeof c == "object" ? c : {}, this.stack = "";
    }
    _.prototype = Error.prototype;
    function R(t) {
      if (process.env.NODE_ENV !== "production")
        var c = {}, P = 0;
      function h(x, y, b, k, A, S, D) {
        if (k = k || T, S = S || b, D !== e) {
          if (E) {
            var a = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw a.name = "Invariant Violation", a;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var B = k + ":" + b;
            !c[B] && // Avoid spamming the console because they are often not actionable except for lib authors
            P < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + S + "` prop on `" + k + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), c[B] = !0, P++);
          }
        }
        return y[b] == null ? x ? y[b] === null ? new _("The " + A + " `" + S + "` is marked as required " + ("in `" + k + "`, but its value is `null`.")) : new _("The " + A + " `" + S + "` is marked as required in " + ("`" + k + "`, but its value is `undefined`.")) : null : t(y, b, k, A, S);
      }
      var g = h.bind(null, !1);
      return g.isRequired = h.bind(null, !0), g;
    }
    function $(t) {
      function c(P, h, g, x, y, b) {
        var k = P[h], A = Y(k);
        if (A !== t) {
          var S = U(k);
          return new _(
            "Invalid " + x + " `" + y + "` of type " + ("`" + S + "` supplied to `" + g + "`, expected ") + ("`" + t + "`."),
            { expectedType: t }
          );
        }
        return null;
      }
      return R(c);
    }
    function j() {
      return R(f);
    }
    function N(t) {
      function c(P, h, g, x, y) {
        if (typeof t != "function")
          return new _("Property `" + y + "` of component `" + g + "` has invalid PropType notation inside arrayOf.");
        var b = P[h];
        if (!Array.isArray(b)) {
          var k = Y(b);
          return new _("Invalid " + x + " `" + y + "` of type " + ("`" + k + "` supplied to `" + g + "`, expected an array."));
        }
        for (var A = 0; A < b.length; A++) {
          var S = t(b, A, g, x, y + "[" + A + "]", e);
          if (S instanceof Error)
            return S;
        }
        return null;
      }
      return R(c);
    }
    function I() {
      function t(c, P, h, g, x) {
        var y = c[P];
        if (!p(y)) {
          var b = Y(y);
          return new _("Invalid " + g + " `" + x + "` of type " + ("`" + b + "` supplied to `" + h + "`, expected a single ReactElement."));
        }
        return null;
      }
      return R(t);
    }
    function s() {
      function t(c, P, h, g, x) {
        var y = c[P];
        if (!n.isValidElementType(y)) {
          var b = Y(y);
          return new _("Invalid " + g + " `" + x + "` of type " + ("`" + b + "` supplied to `" + h + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return R(t);
    }
    function W(t) {
      function c(P, h, g, x, y) {
        if (!(P[h] instanceof t)) {
          var b = t.name || T, k = ne(P[h]);
          return new _("Invalid " + x + " `" + y + "` of type " + ("`" + k + "` supplied to `" + g + "`, expected ") + ("instance of `" + b + "`."));
        }
        return null;
      }
      return R(c);
    }
    function z(t) {
      if (!Array.isArray(t))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), f;
      function c(P, h, g, x, y) {
        for (var b = P[h], k = 0; k < t.length; k++)
          if (C(b, t[k]))
            return null;
        var A = JSON.stringify(t, function(D, a) {
          var B = U(a);
          return B === "symbol" ? String(a) : a;
        });
        return new _("Invalid " + x + " `" + y + "` of value `" + String(b) + "` " + ("supplied to `" + g + "`, expected one of " + A + "."));
      }
      return R(c);
    }
    function J(t) {
      function c(P, h, g, x, y) {
        if (typeof t != "function")
          return new _("Property `" + y + "` of component `" + g + "` has invalid PropType notation inside objectOf.");
        var b = P[h], k = Y(b);
        if (k !== "object")
          return new _("Invalid " + x + " `" + y + "` of type " + ("`" + k + "` supplied to `" + g + "`, expected an object."));
        for (var A in b)
          if (r(b, A)) {
            var S = t(b, A, g, x, y + "." + A, e);
            if (S instanceof Error)
              return S;
          }
        return null;
      }
      return R(c);
    }
    function V(t) {
      if (!Array.isArray(t))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), f;
      for (var c = 0; c < t.length; c++) {
        var P = t[c];
        if (typeof P != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + X(P) + " at index " + c + "."
          ), f;
      }
      function h(g, x, y, b, k) {
        for (var A = [], S = 0; S < t.length; S++) {
          var D = t[S], a = D(g, x, y, b, k, e);
          if (a == null)
            return null;
          a.data && r(a.data, "expectedType") && A.push(a.data.expectedType);
        }
        var B = A.length > 0 ? ", expected one of type [" + A.join(", ") + "]" : "";
        return new _("Invalid " + b + " `" + k + "` supplied to " + ("`" + y + "`" + B + "."));
      }
      return R(h);
    }
    function K() {
      function t(c, P, h, g, x) {
        return H(c[P]) ? null : new _("Invalid " + g + " `" + x + "` supplied to " + ("`" + h + "`, expected a ReactNode."));
      }
      return R(t);
    }
    function Z(t, c, P, h, g) {
      return new _(
        (t || "React class") + ": " + c + " type `" + P + "." + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + g + "`."
      );
    }
    function ee(t) {
      function c(P, h, g, x, y) {
        var b = P[h], k = Y(b);
        if (k !== "object")
          return new _("Invalid " + x + " `" + y + "` of type `" + k + "` " + ("supplied to `" + g + "`, expected `object`."));
        for (var A in t) {
          var S = t[A];
          if (typeof S != "function")
            return Z(g, x, y, A, U(S));
          var D = S(b, A, g, x, y + "." + A, e);
          if (D)
            return D;
        }
        return null;
      }
      return R(c);
    }
    function re(t) {
      function c(P, h, g, x, y) {
        var b = P[h], k = Y(b);
        if (k !== "object")
          return new _("Invalid " + x + " `" + y + "` of type `" + k + "` " + ("supplied to `" + g + "`, expected `object`."));
        var A = m({}, P[h], t);
        for (var S in A) {
          var D = t[S];
          if (r(t, S) && typeof D != "function")
            return Z(g, x, y, S, U(D));
          if (!D)
            return new _(
              "Invalid " + x + " `" + y + "` key `" + S + "` supplied to `" + g + "`.\nBad object: " + JSON.stringify(P[h], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(t), null, "  ")
            );
          var a = D(b, S, g, x, y + "." + S, e);
          if (a)
            return a;
        }
        return null;
      }
      return R(c);
    }
    function H(t) {
      switch (typeof t) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !t;
        case "object":
          if (Array.isArray(t))
            return t.every(H);
          if (t === null || p(t))
            return !0;
          var c = d(t);
          if (c) {
            var P = c.call(t), h;
            if (c !== t.entries) {
              for (; !(h = P.next()).done; )
                if (!H(h.value))
                  return !1;
            } else
              for (; !(h = P.next()).done; ) {
                var g = h.value;
                if (g && !H(g[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function te(t, c) {
      return t === "symbol" ? !0 : c ? c["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && c instanceof Symbol : !1;
    }
    function Y(t) {
      var c = typeof t;
      return Array.isArray(t) ? "array" : t instanceof RegExp ? "object" : te(c, t) ? "symbol" : c;
    }
    function U(t) {
      if (typeof t > "u" || t === null)
        return "" + t;
      var c = Y(t);
      if (c === "object") {
        if (t instanceof Date)
          return "date";
        if (t instanceof RegExp)
          return "regexp";
      }
      return c;
    }
    function X(t) {
      var c = U(t);
      switch (c) {
        case "array":
        case "object":
          return "an " + c;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + c;
        default:
          return c;
      }
    }
    function ne(t) {
      return !t.constructor || !t.constructor.name ? T : t.constructor.name;
    }
    return L.checkPropTypes = l, L.resetWarningCache = l.resetWarningCache, L.PropTypes = L, L;
  }, ce;
}
if (process.env.NODE_ENV !== "production") {
  var De = Te(), Me = !0;
  ue.exports = je()(De.isElement, Me);
} else
  ue.exports = Le()();
var qe = ue.exports;
const o = /* @__PURE__ */ Ae(qe), xe = (n) => {
  let { pageClassName: m, pageLinkClassName: e } = n;
  const {
    page: r,
    selected: l,
    activeClassName: i,
    activeLinkClassName: f,
    getEventListener: p,
    pageSelectedHandler: E,
    href: v,
    extraAriaContext: u,
    pageLabelBuilder: d,
    rel: T
  } = n;
  let L = n.ariaLabel || "Page " + r + (u ? " " + u : ""), C = null;
  return l && (C = "page", L = n.ariaLabel || "Page " + r + " is your current page", typeof m < "u" ? m = m + " " + i : m = i, typeof e < "u" ? typeof f < "u" && (e = e + " " + f) : e = f), /* @__PURE__ */ q.createElement("li", { className: m }, /* @__PURE__ */ q.createElement(
    "a",
    {
      rel: T,
      role: v ? void 0 : "button",
      className: e,
      href: v,
      tabIndex: l ? "-1" : "0",
      "aria-label": L,
      "aria-current": C,
      onKeyPress: E,
      ...p(E)
    },
    d(r)
  ));
};
xe.propTypes = {
  pageSelectedHandler: o.func.isRequired,
  selected: o.bool.isRequired,
  pageClassName: o.string,
  pageLinkClassName: o.string,
  activeClassName: o.string,
  activeLinkClassName: o.string,
  extraAriaContext: o.string,
  href: o.string,
  ariaLabel: o.string,
  page: o.number.isRequired,
  getEventListener: o.func.isRequired,
  pageLabelBuilder: o.func.isRequired,
  rel: o.string
};
const ke = (n) => {
  const {
    breakLabel: m,
    breakAriaLabel: e,
    breakClassName: r,
    breakLinkClassName: l,
    breakHandler: i,
    getEventListener: f
  } = n, p = r || "break";
  return /* @__PURE__ */ q.createElement("li", { className: p }, /* @__PURE__ */ q.createElement(
    "a",
    {
      className: l,
      role: "button",
      tabIndex: "0",
      "aria-label": e,
      onKeyPress: i,
      ...f(i)
    },
    m
  ));
};
ke.propTypes = {
  breakLabel: o.oneOfType([o.string, o.node]),
  breakAriaLabel: o.string,
  breakClassName: o.string,
  breakLinkClassName: o.string,
  breakHandler: o.func.isRequired,
  getEventListener: o.func.isRequired
};
function F(n, m = "") {
  return n ?? m;
}
class Ee extends Oe {
  constructor(e) {
    super(e);
    M(this, "handlePreviousPage", (e) => {
      const { selected: r } = this.state;
      this.handleClick(e, null, r > 0 ? r - 1 : void 0, {
        isPrevious: !0
      });
    });
    M(this, "handleNextPage", (e) => {
      const { selected: r } = this.state, { pageCount: l } = this.props;
      this.handleClick(
        e,
        null,
        r < l - 1 ? r + 1 : void 0,
        { isNext: !0 }
      );
    });
    M(this, "handlePageSelected", (e, r) => {
      if (this.state.selected === e) {
        this.callActiveCallback(e), this.handleClick(r, null, void 0, { isActive: !0 });
        return;
      }
      this.handleClick(r, null, e);
    });
    M(this, "handlePageChange", (e) => {
      this.state.selected !== e && (this.setState({ selected: e }), this.callCallback(e));
    });
    M(this, "getEventListener", (e) => {
      const { eventListener: r } = this.props;
      return {
        [r]: e
      };
    });
    M(this, "handleClick", (e, r, l, {
      isPrevious: i = !1,
      isNext: f = !1,
      isBreak: p = !1,
      isActive: E = !1
    } = {}) => {
      e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      const { selected: v } = this.state, { onClick: u } = this.props;
      let d = l;
      if (u) {
        const T = u({
          index: r,
          selected: v,
          nextSelectedPage: l,
          event: e,
          isPrevious: i,
          isNext: f,
          isBreak: p,
          isActive: E
        });
        if (T === !1)
          return;
        Number.isInteger(T) && (d = T);
      }
      d !== void 0 && this.handlePageChange(d);
    });
    M(this, "handleBreakClick", (e, r) => {
      const { selected: l } = this.state;
      this.handleClick(
        r,
        e,
        l < e ? this.getForwardJump() : this.getBackwardJump(),
        { isBreak: !0 }
      );
    });
    M(this, "callCallback", (e) => {
      this.props.onPageChange !== void 0 && typeof this.props.onPageChange == "function" && this.props.onPageChange({ selected: e });
    });
    M(this, "callActiveCallback", (e) => {
      this.props.onPageActive !== void 0 && typeof this.props.onPageActive == "function" && this.props.onPageActive({ selected: e });
    });
    M(this, "getElementPageRel", (e) => {
      const { selected: r } = this.state, { nextPageRel: l, prevPageRel: i, selectedPageRel: f } = this.props;
      if (r - 1 === e)
        return i;
      if (r === e)
        return f;
      if (r + 1 === e)
        return l;
    });
    M(this, "pagination", () => {
      const e = [], {
        pageRangeDisplayed: r,
        pageCount: l,
        marginPagesDisplayed: i,
        breakLabel: f,
        breakClassName: p,
        breakLinkClassName: E,
        breakAriaLabels: v
      } = this.props, { selected: u } = this.state;
      if (l <= r)
        for (let d = 0; d < l; d++)
          e.push(this.getPageElement(d));
      else {
        let d = r / 2, T = r - d;
        u > l - r / 2 ? (T = l - u, d = r - T) : u < r / 2 && (d = u, T = r - d);
        let L = ($) => this.getPageElement($), C, _;
        const R = [];
        for (C = 0; C < l; C++) {
          const $ = C + 1;
          if ($ <= i) {
            R.push({
              type: "page",
              index: C,
              display: L(C)
            });
            continue;
          }
          if ($ > l - i) {
            R.push({
              type: "page",
              index: C,
              display: L(C)
            });
            continue;
          }
          const j = u === 0 && r > 1 ? T - 1 : T;
          if (C >= u - d && C <= u + j) {
            R.push({
              type: "page",
              index: C,
              display: L(C)
            });
            continue;
          }
          if (f && R.length > 0 && R[R.length - 1].display !== _ && // We do not show break if only one active page is displayed.
          (r > 0 || i > 0)) {
            const N = C < u ? v.backward : v.forward;
            _ = /* @__PURE__ */ q.createElement(
              ke,
              {
                key: C,
                breakAriaLabel: N,
                breakLabel: f,
                breakClassName: p,
                breakLinkClassName: E,
                breakHandler: this.handleBreakClick.bind(null, C),
                getEventListener: this.getEventListener
              }
            ), R.push({ type: "break", index: C, display: _ });
          }
        }
        R.forEach(($, j) => {
          let N = $;
          $.type === "break" && R[j - 1] && R[j - 1].type === "page" && R[j + 1] && R[j + 1].type === "page" && R[j + 1].index - R[j - 1].index <= 2 && (N = {
            type: "page",
            index: $.index,
            display: L($.index)
          }), e.push(N.display);
        });
      }
      return e;
    });
    e.initialPage !== void 0 && e.forcePage !== void 0 && console.warn(
      `(react-paginate): Both initialPage (${e.initialPage}) and forcePage (${e.forcePage}) props are provided, which is discouraged. Use exclusively forcePage prop for a controlled component.
See https://reactjs.org/docs/forms.html#controlled-components`
    );
    let r;
    e.initialPage ? r = e.initialPage : e.forcePage ? r = e.forcePage : r = 0, this.state = {
      selected: r
    };
  }
  componentDidMount() {
    const {
      initialPage: e,
      disableInitialCallback: r,
      extraAriaContext: l,
      pageCount: i,
      forcePage: f
    } = this.props;
    typeof e < "u" && !r && this.callCallback(e), l && console.warn(
      "DEPRECATED (react-paginate): The extraAriaContext prop is deprecated. You should now use the ariaLabelBuilder instead."
    ), Number.isInteger(i) || console.warn(
      `(react-paginate): The pageCount prop value provided is not an integer (${i}). Did you forget a Math.ceil()?`
    ), e !== void 0 && e > i - 1 && console.warn(
      `(react-paginate): The initialPage prop provided is greater than the maximum page index from pageCount prop (${e} > ${i - 1}).`
    ), f !== void 0 && f > i - 1 && console.warn(
      `(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (${f} > ${i - 1}).`
    );
  }
  componentDidUpdate(e) {
    this.props.forcePage !== void 0 && this.props.forcePage !== e.forcePage && (this.props.forcePage > this.props.pageCount - 1 && console.warn(
      `(react-paginate): The forcePage prop provided is greater than the maximum page index from pageCount prop (${this.props.forcePage} > ${this.props.pageCount - 1}).`
    ), this.setState({ selected: this.props.forcePage })), Number.isInteger(e.pageCount) && !Number.isInteger(this.props.pageCount) && console.warn(
      `(react-paginate): The pageCount prop value provided is not an integer (${this.props.pageCount}). Did you forget a Math.ceil()?`
    );
  }
  getForwardJump() {
    const { selected: e } = this.state, { pageCount: r, pageRangeDisplayed: l } = this.props, i = e + l;
    return i >= r ? r - 1 : i;
  }
  getBackwardJump() {
    const { selected: e } = this.state, { pageRangeDisplayed: r } = this.props, l = e - r;
    return l < 0 ? 0 : l;
  }
  getElementHref(e) {
    const { hrefBuilder: r, pageCount: l, hrefAllControls: i } = this.props;
    if (r && (i || e >= 0 && e < l))
      return r(e + 1, l, this.state.selected);
  }
  ariaLabelBuilder(e) {
    const r = e === this.state.selected;
    if (this.props.ariaLabelBuilder && e >= 0 && e < this.props.pageCount) {
      let l = this.props.ariaLabelBuilder(e + 1, r);
      return this.props.extraAriaContext && !r && (l = l + " " + this.props.extraAriaContext), l;
    }
  }
  getPageElement(e) {
    const { selected: r } = this.state, {
      pageClassName: l,
      pageLinkClassName: i,
      activeClassName: f,
      activeLinkClassName: p,
      extraAriaContext: E,
      pageLabelBuilder: v
    } = this.props;
    return /* @__PURE__ */ q.createElement(
      xe,
      {
        key: e,
        pageSelectedHandler: this.handlePageSelected.bind(null, e),
        selected: r === e,
        rel: this.getElementPageRel(e),
        pageClassName: l,
        pageLinkClassName: i,
        activeClassName: f,
        activeLinkClassName: p,
        extraAriaContext: E,
        href: this.getElementHref(e),
        ariaLabel: this.ariaLabelBuilder(e),
        page: e + 1,
        pageLabelBuilder: v,
        getEventListener: this.getEventListener
      }
    );
  }
  render() {
    const { renderOnZeroPageCount: e } = this.props;
    if (this.props.pageCount === 0 && e !== void 0)
      return e && e(this.props);
    const {
      disabledClassName: r,
      disabledLinkClassName: l,
      pageCount: i,
      className: f,
      containerClassName: p,
      previousLabel: E,
      previousClassName: v,
      previousLinkClassName: u,
      previousAriaLabel: d,
      prevRel: T,
      nextLabel: L,
      nextClassName: C,
      nextLinkClassName: _,
      nextAriaLabel: R,
      nextRel: $
    } = this.props, { selected: j } = this.state, N = j === 0, I = j === i - 1, s = `${F(v)}${N ? ` ${F(r)}` : ""}`, W = `${F(C)}${I ? ` ${F(r)}` : ""}`, z = `${F(u)}${N ? ` ${F(l)}` : ""}`, J = `${F(_)}${I ? ` ${F(l)}` : ""}`, V = N ? "true" : "false", K = I ? "true" : "false";
    return /* @__PURE__ */ q.createElement(
      "ul",
      {
        className: f || p,
        role: "navigation",
        "aria-label": "Pagination"
      },
      /* @__PURE__ */ q.createElement("li", { className: s }, /* @__PURE__ */ q.createElement(
        "a",
        {
          className: z,
          href: this.getElementHref(j - 1),
          tabIndex: N ? "-1" : "0",
          role: "button",
          onKeyPress: this.handlePreviousPage,
          "aria-disabled": V,
          "aria-label": d,
          rel: T,
          ...this.getEventListener(this.handlePreviousPage)
        },
        E
      )),
      this.pagination(),
      /* @__PURE__ */ q.createElement("li", { className: W }, /* @__PURE__ */ q.createElement(
        "a",
        {
          className: J,
          href: this.getElementHref(j + 1),
          tabIndex: I ? "-1" : "0",
          role: "button",
          onKeyPress: this.handleNextPage,
          "aria-disabled": K,
          "aria-label": R,
          rel: $,
          ...this.getEventListener(this.handleNextPage)
        },
        L
      ))
    );
  }
}
M(Ee, "propTypes", {
  pageCount: o.number.isRequired,
  pageRangeDisplayed: o.number,
  marginPagesDisplayed: o.number,
  previousLabel: o.node,
  previousAriaLabel: o.string,
  prevPageRel: o.string,
  prevRel: o.string,
  nextLabel: o.node,
  nextAriaLabel: o.string,
  nextPageRel: o.string,
  nextRel: o.string,
  breakLabel: o.oneOfType([o.string, o.node]),
  breakAriaLabels: o.shape({
    forward: o.string,
    backward: o.string
  }),
  hrefBuilder: o.func,
  hrefAllControls: o.bool,
  onPageChange: o.func,
  onPageActive: o.func,
  onClick: o.func,
  initialPage: o.number,
  forcePage: o.number,
  disableInitialCallback: o.bool,
  containerClassName: o.string,
  className: o.string,
  pageClassName: o.string,
  pageLinkClassName: o.string,
  pageLabelBuilder: o.func,
  activeClassName: o.string,
  activeLinkClassName: o.string,
  previousClassName: o.string,
  nextClassName: o.string,
  previousLinkClassName: o.string,
  nextLinkClassName: o.string,
  disabledClassName: o.string,
  disabledLinkClassName: o.string,
  breakClassName: o.string,
  breakLinkClassName: o.string,
  extraAriaContext: o.string,
  ariaLabelBuilder: o.func,
  eventListener: o.string,
  renderOnZeroPageCount: o.func,
  selectedPageRel: o.string
}), M(Ee, "defaultProps", {
  pageRangeDisplayed: 2,
  marginPagesDisplayed: 3,
  activeClassName: "selected",
  previousLabel: "Previous",
  previousClassName: "previous",
  previousAriaLabel: "Previous page",
  prevPageRel: "prev",
  prevRel: "prev",
  nextLabel: "Next",
  nextClassName: "next",
  nextAriaLabel: "Next page",
  nextPageRel: "next",
  nextRel: "next",
  breakLabel: "...",
  breakAriaLabels: { forward: "Jump forward", backward: "Jump backward" },
  disabledClassName: "disabled",
  disableInitialCallback: !1,
  pageLabelBuilder: (e) => e,
  eventListener: "onClick",
  renderOnZeroPageCount: void 0,
  selectedPageRel: "canonical",
  hrefAllControls: !1
});
export {
  Ee as default
};
