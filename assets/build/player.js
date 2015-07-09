if(typeof Math.imul == "undefined" || (Math.imul(0xffffffff,5) == 0)) {
    Math.imul = function (a, b) {
        var ah  = (a >>> 16) & 0xffff;
        var al = a & 0xffff;
        var bh  = (b >>> 16) & 0xffff;
        var bl = b & 0xffff;
        // the shift by 0 fixes the sign on the high part
        // the final |0 converts the unsigned value into a signed value
        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
    }
}


;(function(){
var f;
function t(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
}
var ba = "closure_uid_" + (1E9 * Math.random() >>> 0), da = 0;
function ea(a) {
  return Array.prototype.join.call(arguments, "");
}
;function fa(a, b) {
  for (var c in a) {
    b.call(void 0, a[c], c, a);
  }
}
;function ga(a, b) {
  null != a && this.append.apply(this, arguments);
}
f = ga.prototype;
f.Ha = "";
f.set = function(a) {
  this.Ha = "" + a;
};
f.append = function(a, b, c) {
  this.Ha += a;
  if (null != b) {
    for (var d = 1;d < arguments.length;d++) {
      this.Ha += arguments[d];
    }
  }
  return this;
};
f.clear = function() {
  this.Ha = "";
};
f.toString = function() {
  return this.Ha;
};
if ("undefined" === typeof ha) {
  var ha = function() {
    throw Error("No *print-fn* fn set for evaluation environment");
  }
}
var ka = null;
if ("undefined" === typeof la) {
  var la = null
}
function na() {
  return new oa(null, 5, [qa, !0, sa, !0, ta, !1, ua, !1, va, null], null);
}
function x(a) {
  return null != a && !1 !== a;
}
function ya(a) {
  return a instanceof Array;
}
function y(a, b) {
  return a[t(null == b ? null : b)] ? !0 : a._ ? !0 : !1;
}
function A(a, b) {
  var c = null == b ? null : b.constructor, c = x(x(c) ? c.yb : c) ? c.xb : t(b);
  return Error(["No protocol method ", a, " defined for type ", c, ": ", b].join(""));
}
function za(a) {
  var b = a.xb;
  return x(b) ? b : "" + C(a);
}
var Aa = "undefined" !== typeof Symbol && "function" === t(Symbol) ? Symbol.iterator : "@@iterator";
function D(a) {
  for (var b = a.length, c = Array(b), d = 0;;) {
    if (d < b) {
      c[d] = a[d], d += 1;
    } else {
      break;
    }
  }
  return c;
}
var Ba = {}, Ca = {}, Da = function Da(b) {
  if (b ? b.X : b) {
    return b.X(b);
  }
  var c;
  c = Da[t(null == b ? null : b)];
  if (!c && (c = Da._, !c)) {
    throw A("ICounted.-count", b);
  }
  return c.call(null, b);
}, Fa = function Fa(b, c) {
  if (b ? b.K : b) {
    return b.K(b, c);
  }
  var d;
  d = Fa[t(null == b ? null : b)];
  if (!d && (d = Fa._, !d)) {
    throw A("ICollection.-conj", b);
  }
  return d.call(null, b, c);
}, Ga = {}, E = function E() {
  switch(arguments.length) {
    case 2:
      return E.h(arguments[0], arguments[1]);
    case 3:
      return E.o(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
};
E.h = function(a, b) {
  if (a ? a.S : a) {
    return a.S(a, b);
  }
  var c;
  c = E[t(null == a ? null : a)];
  if (!c && (c = E._, !c)) {
    throw A("IIndexed.-nth", a);
  }
  return c.call(null, a, b);
};
E.o = function(a, b, c) {
  if (a ? a.ea : a) {
    return a.ea(a, b, c);
  }
  var d;
  d = E[t(null == a ? null : a)];
  if (!d && (d = E._, !d)) {
    throw A("IIndexed.-nth", a);
  }
  return d.call(null, a, b, c);
};
E.Y = 3;
var Ha = {}, G = function G(b) {
  if (b ? b.V : b) {
    return b.V(b);
  }
  var c;
  c = G[t(null == b ? null : b)];
  if (!c && (c = G._, !c)) {
    throw A("ISeq.-first", b);
  }
  return c.call(null, b);
}, H = function H(b) {
  if (b ? b.ca : b) {
    return b.ca(b);
  }
  var c;
  c = H[t(null == b ? null : b)];
  if (!c && (c = H._, !c)) {
    throw A("ISeq.-rest", b);
  }
  return c.call(null, b);
}, Ia = {}, Ja = {}, I = function I() {
  switch(arguments.length) {
    case 2:
      return I.h(arguments[0], arguments[1]);
    case 3:
      return I.o(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
};
I.h = function(a, b) {
  if (a ? a.M : a) {
    return a.M(a, b);
  }
  var c;
  c = I[t(null == a ? null : a)];
  if (!c && (c = I._, !c)) {
    throw A("ILookup.-lookup", a);
  }
  return c.call(null, a, b);
};
I.o = function(a, b, c) {
  if (a ? a.H : a) {
    return a.H(a, b, c);
  }
  var d;
  d = I[t(null == a ? null : a)];
  if (!d && (d = I._, !d)) {
    throw A("ILookup.-lookup", a);
  }
  return d.call(null, a, b, c);
};
I.Y = 3;
var Ka = function Ka(b, c, d) {
  if (b ? b.Na : b) {
    return b.Na(b, c, d);
  }
  var e;
  e = Ka[t(null == b ? null : b)];
  if (!e && (e = Ka._, !e)) {
    throw A("IAssociative.-assoc", b);
  }
  return e.call(null, b, c, d);
}, La = {}, Na = {}, Oa = function Oa(b) {
  if (b ? b.bb : b) {
    return b.bb();
  }
  var c;
  c = Oa[t(null == b ? null : b)];
  if (!c && (c = Oa._, !c)) {
    throw A("IMapEntry.-key", b);
  }
  return c.call(null, b);
}, Pa = function Pa(b) {
  if (b ? b.cb : b) {
    return b.cb();
  }
  var c;
  c = Pa[t(null == b ? null : b)];
  if (!c && (c = Pa._, !c)) {
    throw A("IMapEntry.-val", b);
  }
  return c.call(null, b);
}, Qa = {}, Ra = function Ra(b, c, d) {
  if (b ? b.eb : b) {
    return b.eb(b, c, d);
  }
  var e;
  e = Ra[t(null == b ? null : b)];
  if (!e && (e = Ra._, !e)) {
    throw A("IVector.-assoc-n", b);
  }
  return e.call(null, b, c, d);
}, Sa = function Sa(b) {
  if (b ? b.nb : b) {
    return b.state;
  }
  var c;
  c = Sa[t(null == b ? null : b)];
  if (!c && (c = Sa._, !c)) {
    throw A("IDeref.-deref", b);
  }
  return c.call(null, b);
}, Ta = {}, Ua = function Ua(b) {
  if (b ? b.J : b) {
    return b.J(b);
  }
  var c;
  c = Ua[t(null == b ? null : b)];
  if (!c && (c = Ua._, !c)) {
    throw A("IMeta.-meta", b);
  }
  return c.call(null, b);
}, Wa = {}, Xa = function Xa(b, c) {
  if (b ? b.P : b) {
    return b.P(b, c);
  }
  var d;
  d = Xa[t(null == b ? null : b)];
  if (!d && (d = Xa._, !d)) {
    throw A("IWithMeta.-with-meta", b);
  }
  return d.call(null, b, c);
}, Ya = {}, Za = function Za() {
  switch(arguments.length) {
    case 2:
      return Za.h(arguments[0], arguments[1]);
    case 3:
      return Za.o(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
};
Za.h = function(a, b) {
  if (a ? a.T : a) {
    return a.T(a, b);
  }
  var c;
  c = Za[t(null == a ? null : a)];
  if (!c && (c = Za._, !c)) {
    throw A("IReduce.-reduce", a);
  }
  return c.call(null, a, b);
};
Za.o = function(a, b, c) {
  if (a ? a.U : a) {
    return a.U(a, b, c);
  }
  var d;
  d = Za[t(null == a ? null : a)];
  if (!d && (d = Za._, !d)) {
    throw A("IReduce.-reduce", a);
  }
  return d.call(null, a, b, c);
};
Za.Y = 3;
var $a = function $a(b, c) {
  if (b ? b.w : b) {
    return b.w(b, c);
  }
  var d;
  d = $a[t(null == b ? null : b)];
  if (!d && (d = $a._, !d)) {
    throw A("IEquiv.-equiv", b);
  }
  return d.call(null, b, c);
}, ab = function ab(b) {
  if (b ? b.G : b) {
    return b.G(b);
  }
  var c;
  c = ab[t(null == b ? null : b)];
  if (!c && (c = ab._, !c)) {
    throw A("IHash.-hash", b);
  }
  return c.call(null, b);
}, bb = {}, cb = function cb(b) {
  if (b ? b.O : b) {
    return b.O(b);
  }
  var c;
  c = cb[t(null == b ? null : b)];
  if (!c && (c = cb._, !c)) {
    throw A("ISeqable.-seq", b);
  }
  return c.call(null, b);
}, db = {}, J = function J(b, c) {
  if (b ? b.jb : b) {
    return b.jb(0, c);
  }
  var d;
  d = J[t(null == b ? null : b)];
  if (!d && (d = J._, !d)) {
    throw A("IWriter.-write", b);
  }
  return d.call(null, b, c);
}, fb = {}, gb = function gb(b, c, d) {
  if (b ? b.D : b) {
    return b.D(b, c, d);
  }
  var e;
  e = gb[t(null == b ? null : b)];
  if (!e && (e = gb._, !e)) {
    throw A("IPrintWithWriter.-pr-writer", b);
  }
  return e.call(null, b, c, d);
}, hb = function hb(b, c, d) {
  if (b ? b.ib : b) {
    return b.ib(0, c, d);
  }
  var e;
  e = hb[t(null == b ? null : b)];
  if (!e && (e = hb._, !e)) {
    throw A("IWatchable.-notify-watches", b);
  }
  return e.call(null, b, c, d);
}, ib = function ib(b) {
  if (b ? b.Ra : b) {
    return b.Ra(b);
  }
  var c;
  c = ib[t(null == b ? null : b)];
  if (!c && (c = ib._, !c)) {
    throw A("IEditableCollection.-as-transient", b);
  }
  return c.call(null, b);
}, jb = function jb(b, c) {
  if (b ? b.Wa : b) {
    return b.Wa(b, c);
  }
  var d;
  d = jb[t(null == b ? null : b)];
  if (!d && (d = jb._, !d)) {
    throw A("ITransientCollection.-conj!", b);
  }
  return d.call(null, b, c);
}, kb = function kb(b) {
  if (b ? b.Xa : b) {
    return b.Xa(b);
  }
  var c;
  c = kb[t(null == b ? null : b)];
  if (!c && (c = kb._, !c)) {
    throw A("ITransientCollection.-persistent!", b);
  }
  return c.call(null, b);
}, lb = function lb(b, c, d) {
  if (b ? b.Oa : b) {
    return b.Oa(b, c, d);
  }
  var e;
  e = lb[t(null == b ? null : b)];
  if (!e && (e = lb._, !e)) {
    throw A("ITransientAssociative.-assoc!", b);
  }
  return e.call(null, b, c, d);
}, mb = function mb(b, c, d) {
  if (b ? b.hb : b) {
    return b.hb(0, c, d);
  }
  var e;
  e = mb[t(null == b ? null : b)];
  if (!e && (e = mb._, !e)) {
    throw A("ITransientVector.-assoc-n!", b);
  }
  return e.call(null, b, c, d);
}, nb = function nb(b) {
  if (b ? b.gb : b) {
    return b.gb();
  }
  var c;
  c = nb[t(null == b ? null : b)];
  if (!c && (c = nb._, !c)) {
    throw A("IChunk.-drop-first", b);
  }
  return c.call(null, b);
}, ob = function ob(b) {
  if (b ? b.$a : b) {
    return b.$a(b);
  }
  var c;
  c = ob[t(null == b ? null : b)];
  if (!c && (c = ob._, !c)) {
    throw A("IChunkedSeq.-chunked-first", b);
  }
  return c.call(null, b);
}, pb = function pb(b) {
  if (b ? b.ab : b) {
    return b.ab(b);
  }
  var c;
  c = pb[t(null == b ? null : b)];
  if (!c && (c = pb._, !c)) {
    throw A("IChunkedSeq.-chunked-rest", b);
  }
  return c.call(null, b);
}, qb = function qb(b) {
  if (b ? b.Za : b) {
    return b.Za(b);
  }
  var c;
  c = qb[t(null == b ? null : b)];
  if (!c && (c = qb._, !c)) {
    throw A("IChunkedNext.-chunked-next", b);
  }
  return c.call(null, b);
}, rb = function rb(b, c) {
  if (b ? b.wb : b) {
    return b.wb(b, c);
  }
  var d;
  d = rb[t(null == b ? null : b)];
  if (!d && (d = rb._, !d)) {
    throw A("IReset.-reset!", b);
  }
  return d.call(null, b, c);
}, tb = function tb(b) {
  if (b ? b.Ta : b) {
    return b.Ta(b);
  }
  var c;
  c = tb[t(null == b ? null : b)];
  if (!c && (c = tb._, !c)) {
    throw A("IIterable.-iterator", b);
  }
  return c.call(null, b);
};
function ub(a) {
  this.zb = a;
  this.m = 1073741824;
  this.A = 0;
}
ub.prototype.jb = function(a, b) {
  return this.zb.append(b);
};
function vb(a) {
  var b = new ga;
  a.D(null, new ub(b), na());
  return "" + C(b);
}
var wb = "undefined" !== typeof Math.imul && 0 !== Math.imul(4294967295, 5) ? function(a, b) {
  return Math.imul(a, b);
} : function(a, b) {
  var c = a & 65535, d = b & 65535;
  return c * d + ((a >>> 16 & 65535) * d + c * (b >>> 16 & 65535) << 16 >>> 0) | 0;
};
function xb(a) {
  a = wb(a | 0, -862048943);
  return wb(a << 15 | a >>> -15, 461845907);
}
function yb(a, b) {
  var c = (a | 0) ^ (b | 0);
  return wb(c << 13 | c >>> -13, 5) + -430675100 | 0;
}
function zb(a, b) {
  var c = (a | 0) ^ b, c = wb(c ^ c >>> 16, -2048144789), c = wb(c ^ c >>> 13, -1028477387);
  return c ^ c >>> 16;
}
function Ab(a) {
  var b;
  a: {
    b = 1;
    for (var c = 0;;) {
      if (b < a.length) {
        var d = b + 2, c = yb(c, xb(a.charCodeAt(b - 1) | a.charCodeAt(b) << 16));
        b = d;
      } else {
        b = c;
        break a;
      }
    }
  }
  b = 1 === (a.length & 1) ? b ^ xb(a.charCodeAt(a.length - 1)) : b;
  return zb(b, wb(2, a.length));
}
var Bb = {}, Cb = 0;
function Db(a) {
  255 < Cb && (Bb = {}, Cb = 0);
  var b = Bb[a];
  if ("number" !== typeof b) {
    a: {
      if (null != a) {
        if (b = a.length, 0 < b) {
          for (var c = 0, d = 0;;) {
            if (c < b) {
              var e = c + 1, d = wb(31, d) + a.charCodeAt(c), c = e
            } else {
              b = d;
              break a;
            }
          }
        } else {
          b = 0;
        }
      } else {
        b = 0;
      }
    }
    Bb[a] = b;
    Cb += 1;
  }
  return a = b;
}
function Eb(a) {
  a && (a.m & 4194304 || a.Db) ? a = a.G(null) : "number" === typeof a ? a = Math.floor(a) % 2147483647 : !0 === a ? a = 1 : !1 === a ? a = 0 : "string" === typeof a ? (a = Db(a), 0 !== a && (a = xb(a), a = yb(0, a), a = zb(a, 4))) : a = a instanceof Date ? a.valueOf() : null == a ? 0 : ab(a);
  return a;
}
function Fb(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2);
}
function Gb(a, b, c, d, e) {
  this.Qa = a;
  this.name = b;
  this.Ga = c;
  this.Ka = d;
  this.da = e;
  this.m = 2154168321;
  this.A = 4096;
}
f = Gb.prototype;
f.toString = function() {
  return this.Ga;
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.w = function(a, b) {
  return b instanceof Gb ? this.Ga === b.Ga : !1;
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return I.o(c, this, null);
      case 3:
        return I.o(c, this, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return I.o(c, this, null);
  };
  a.o = function(a, c, d) {
    return I.o(c, this, d);
  };
  return a;
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(D(b)));
};
f.j = function(a) {
  return I.o(a, this, null);
};
f.h = function(a, b) {
  return I.o(a, this, b);
};
f.J = function() {
  return this.da;
};
f.P = function(a, b) {
  return new Gb(this.Qa, this.name, this.Ga, this.Ka, b);
};
f.G = function() {
  var a = this.Ka;
  return null != a ? a : this.Ka = a = Fb(Ab(this.name), Db(this.Qa));
};
f.D = function(a, b) {
  return J(b, this.Ga);
};
function L(a) {
  if (null == a) {
    return null;
  }
  if (a && (a.m & 8388608 || a.Eb)) {
    return a.O(null);
  }
  if (ya(a) || "string" === typeof a) {
    return 0 === a.length ? null : new M(a, 0);
  }
  if (y(bb, a)) {
    return cb(a);
  }
  throw Error([C(a), C(" is not ISeqable")].join(""));
}
function N(a) {
  if (null == a) {
    return null;
  }
  if (a && (a.m & 64 || a.Va)) {
    return a.V(null);
  }
  a = L(a);
  return null == a ? null : G(a);
}
function Hb(a) {
  return null != a ? a && (a.m & 64 || a.Va) ? a.ca(null) : (a = L(a)) ? H(a) : Ib : Ib;
}
function O(a) {
  return null == a ? null : a && (a.m & 128 || a.Ua) ? a.ba(null) : L(Hb(a));
}
var P = function P() {
  switch(arguments.length) {
    case 1:
      return P.j(arguments[0]);
    case 2:
      return P.h(arguments[0], arguments[1]);
    default:
      var b = new M(Array.prototype.slice.call(arguments, 2), 0);
      return P.C(arguments[0], arguments[1], b);
  }
};
P.j = function() {
  return !0;
};
P.h = function(a, b) {
  return null == a ? null == b : a === b || $a(a, b);
};
P.C = function(a, b, c) {
  for (;;) {
    if (P.h(a, b)) {
      if (O(c)) {
        a = b, b = N(c), c = O(c);
      } else {
        return P.h(b, N(c));
      }
    } else {
      return !1;
    }
  }
};
P.R = function(a) {
  var b = N(a), c = O(a);
  a = N(c);
  c = O(c);
  return P.C(b, a, c);
};
P.Y = 2;
function Jb(a) {
  this.s = a;
}
Jb.prototype.next = function() {
  if (null != this.s) {
    var a = N(this.s);
    this.s = O(this.s);
    return {value:a, done:!1};
  }
  return {value:null, done:!0};
};
function Q(a) {
  return new Jb(L(a));
}
function Kb(a, b) {
  var c = xb(a), c = yb(0, c);
  return zb(c, b);
}
function Lb(a) {
  var b = 0, c = 1;
  for (a = L(a);;) {
    if (null != a) {
      b += 1, c = wb(31, c) + Eb(N(a)) | 0, a = O(a);
    } else {
      return Kb(c, b);
    }
  }
}
var Mb = Kb(1, 0);
function Nb(a) {
  var b = 0, c = 0;
  for (a = L(a);;) {
    if (null != a) {
      b += 1, c = c + Eb(N(a)) | 0, a = O(a);
    } else {
      return Kb(c, b);
    }
  }
}
var Ob = Kb(0, 0);
Ca["null"] = !0;
Da["null"] = function() {
  return 0;
};
Date.prototype.w = function(a, b) {
  return b instanceof Date && this.valueOf() === b.valueOf();
};
$a.number = function(a, b) {
  return a === b;
};
Ba["function"] = !0;
Ta["function"] = !0;
Ua["function"] = function() {
  return null;
};
ab._ = function(a) {
  return a[ba] || (a[ba] = ++da);
};
function Pb(a) {
  return Sa(a);
}
function Qb(a, b) {
  var c = Da(a);
  if (0 === c) {
    return b.F ? b.F() : b.call(null);
  }
  for (var d = E.h(a, 0), e = 1;;) {
    if (e < c) {
      var g = E.h(a, e), d = b.h ? b.h(d, g) : b.call(null, d, g), e = e + 1
    } else {
      return d;
    }
  }
}
function Rb(a, b, c) {
  var d = Da(a), e = c;
  for (c = 0;;) {
    if (c < d) {
      var g = E.h(a, c), e = b.h ? b.h(e, g) : b.call(null, e, g);
      c += 1;
    } else {
      return e;
    }
  }
}
function Sb(a, b) {
  var c = a.length;
  if (0 === a.length) {
    return b.F ? b.F() : b.call(null);
  }
  for (var d = a[0], e = 1;;) {
    if (e < c) {
      var g = a[e], d = b.h ? b.h(d, g) : b.call(null, d, g), e = e + 1
    } else {
      return d;
    }
  }
}
function Tb(a, b, c) {
  var d = a.length, e = c;
  for (c = 0;;) {
    if (c < d) {
      var g = a[c], e = b.h ? b.h(e, g) : b.call(null, e, g);
      c += 1;
    } else {
      return e;
    }
  }
}
function Ub(a, b, c, d) {
  for (var e = a.length;;) {
    if (d < e) {
      var g = a[d];
      c = b.h ? b.h(c, g) : b.call(null, c, g);
      d += 1;
    } else {
      return c;
    }
  }
}
function Wb(a) {
  return a ? a.m & 2 || a.mb ? !0 : a.m ? !1 : y(Ca, a) : y(Ca, a);
}
function Xb(a, b) {
  this.c = a;
  this.i = b;
}
Xb.prototype.fb = function() {
  return this.i < this.c.length;
};
Xb.prototype.next = function() {
  var a = this.c[this.i];
  this.i += 1;
  return a;
};
function M(a, b) {
  this.c = a;
  this.i = b;
  this.m = 166199550;
  this.A = 8192;
}
f = M.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.S = function(a, b) {
  var c = b + this.i;
  return c < this.c.length ? this.c[c] : null;
};
f.ea = function(a, b, c) {
  a = b + this.i;
  return a < this.c.length ? this.c[a] : c;
};
f.Ta = function() {
  return new Xb(this.c, this.i);
};
f.ba = function() {
  return this.i + 1 < this.c.length ? new M(this.c, this.i + 1) : null;
};
f.X = function() {
  var a = this.c.length - this.i;
  return 0 > a ? 0 : a;
};
f.G = function() {
  return Lb(this);
};
f.w = function(a, b) {
  return Yb.h ? Yb.h(this, b) : Yb.call(null, this, b);
};
f.T = function(a, b) {
  return Ub(this.c, b, this.c[this.i], this.i + 1);
};
f.U = function(a, b, c) {
  return Ub(this.c, b, c, this.i);
};
f.V = function() {
  return this.c[this.i];
};
f.ca = function() {
  return this.i + 1 < this.c.length ? new M(this.c, this.i + 1) : Ib;
};
f.O = function() {
  return this.i < this.c.length ? this : null;
};
f.K = function(a, b) {
  return S.h ? S.h(b, this) : S.call(null, b, this);
};
M.prototype[Aa] = function() {
  return Q(this);
};
function Zb(a, b) {
  return b < a.length ? new M(a, b) : null;
}
function $b() {
  switch(arguments.length) {
    case 1:
      return Zb(arguments[0], 0);
    case 2:
      return Zb(arguments[0], arguments[1]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
}
$a._ = function(a, b) {
  return a === b;
};
var ac = function ac() {
  switch(arguments.length) {
    case 0:
      return ac.F();
    case 1:
      return ac.j(arguments[0]);
    case 2:
      return ac.h(arguments[0], arguments[1]);
    default:
      var b = new M(Array.prototype.slice.call(arguments, 2), 0);
      return ac.C(arguments[0], arguments[1], b);
  }
};
ac.F = function() {
  return bc;
};
ac.j = function(a) {
  return a;
};
ac.h = function(a, b) {
  return null != a ? Fa(a, b) : Fa(Ib, b);
};
ac.C = function(a, b, c) {
  for (;;) {
    if (x(c)) {
      a = ac.h(a, b), b = N(c), c = O(c);
    } else {
      return ac.h(a, b);
    }
  }
};
ac.R = function(a) {
  var b = N(a), c = O(a);
  a = N(c);
  c = O(c);
  return ac.C(b, a, c);
};
ac.Y = 2;
function T(a) {
  if (null != a) {
    if (a && (a.m & 2 || a.mb)) {
      a = a.X(null);
    } else {
      if (ya(a)) {
        a = a.length;
      } else {
        if ("string" === typeof a) {
          a = a.length;
        } else {
          if (y(Ca, a)) {
            a = Da(a);
          } else {
            a: {
              a = L(a);
              for (var b = 0;;) {
                if (Wb(a)) {
                  a = b + Da(a);
                  break a;
                }
                a = O(a);
                b += 1;
              }
            }
          }
        }
      }
    }
  } else {
    a = 0;
  }
  return a;
}
function cc(a, b) {
  for (var c = null;;) {
    if (null == a) {
      return c;
    }
    if (0 === b) {
      return L(a) ? N(a) : c;
    }
    var d = a;
    if (d ? d.m & 16 || d.pb || (d.m ? 0 : y(Ga, d)) : y(Ga, d)) {
      return E.o(a, b, c);
    }
    if (L(a)) {
      var d = O(a), e = b - 1;
      a = d;
      b = e;
    } else {
      return c;
    }
  }
}
function dc(a, b) {
  if ("number" !== typeof b) {
    throw Error("index argument to nth must be a number.");
  }
  if (null == a) {
    return null;
  }
  if (a && (a.m & 16 || a.pb)) {
    return a.ea(null, b, null);
  }
  if (ya(a) || "string" === typeof a) {
    return b < a.length ? a[b] : null;
  }
  if (y(Ga, a)) {
    return E.h(a, b);
  }
  if (a ? a.m & 64 || a.Va || (a.m ? 0 : y(Ha, a)) : y(Ha, a)) {
    return cc(a, b);
  }
  throw Error([C("nth not supported on this type "), C(za(null == a ? null : a.constructor))].join(""));
}
function ec(a, b) {
  return null == a ? null : a && (a.m & 256 || a.qb) ? a.M(null, b) : ya(a) ? b < a.length ? a[b | 0] : null : "string" === typeof a ? b < a.length ? a[b | 0] : null : y(Ja, a) ? I.h(a, b) : null;
}
function fc(a, b, c) {
  return null != a ? a && (a.m & 256 || a.qb) ? a.H(null, b, c) : ya(a) ? b < a.length ? a[b] : c : "string" === typeof a ? b < a.length ? a[b] : c : y(Ja, a) ? I.o(a, b, c) : c : c;
}
var gc = function gc() {
  switch(arguments.length) {
    case 3:
      return gc.o(arguments[0], arguments[1], arguments[2]);
    default:
      var b = new M(Array.prototype.slice.call(arguments, 3), 0);
      return gc.C(arguments[0], arguments[1], arguments[2], b);
  }
};
gc.o = function(a, b, c) {
  if (null != a) {
    a = Ka(a, b, c);
  } else {
    a: {
      a = [b];
      c = [c];
      b = a.length;
      var d = 0, e;
      for (e = ib(hc);;) {
        if (d < b) {
          var g = d + 1;
          e = e.Oa(null, a[d], c[d]);
          d = g;
        } else {
          a = kb(e);
          break a;
        }
      }
    }
  }
  return a;
};
gc.C = function(a, b, c, d) {
  for (;;) {
    if (a = gc.o(a, b, c), x(d)) {
      b = N(d), c = N(O(d)), d = O(O(d));
    } else {
      return a;
    }
  }
};
gc.R = function(a) {
  var b = N(a), c = O(a);
  a = N(c);
  var d = O(c), c = N(d), d = O(d);
  return gc.C(b, a, c, d);
};
gc.Y = 3;
function ic(a) {
  var b = "function" == t(a);
  return x(b) ? b : a ? x(x(null) ? null : a.lb) ? !0 : a.Jb ? !1 : y(Ba, a) : y(Ba, a);
}
function jc(a, b) {
  this.f = a;
  this.meta = b;
  this.m = 393217;
  this.A = 0;
}
f = jc.prototype;
f.J = function() {
  return this.meta;
};
f.P = function(a, b) {
  return new jc(this.f, b);
};
f.lb = !0;
f.call = function() {
  function a(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w, F, K, aa) {
    a = this.f;
    return kc.Sa ? kc.Sa(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w, F, K, aa) : kc.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w, F, K, aa);
  }
  function b(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w, F, K) {
    a = this;
    return a.f.wa ? a.f.wa(b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w, F, K) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w, F, K);
  }
  function c(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w, F) {
    a = this;
    return a.f.va ? a.f.va(b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w, F) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w, F);
  }
  function d(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w) {
    a = this;
    return a.f.ua ? a.f.ua(b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, w);
  }
  function e(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B) {
    a = this;
    return a.f.ta ? a.f.ta(b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B);
  }
  function g(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z) {
    a = this;
    return a.f.sa ? a.f.sa(b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z);
  }
  function h(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v) {
    a = this;
    return a.f.ra ? a.f.ra(b, c, d, e, g, h, k, l, m, n, p, q, r, u, v) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v);
  }
  function k(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u) {
    a = this;
    return a.f.qa ? a.f.qa(b, c, d, e, g, h, k, l, m, n, p, q, r, u) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, r, u);
  }
  function l(a, b, c, d, e, g, h, k, l, m, n, p, q, r) {
    a = this;
    return a.f.pa ? a.f.pa(b, c, d, e, g, h, k, l, m, n, p, q, r) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, r);
  }
  function m(a, b, c, d, e, g, h, k, l, m, n, p, q) {
    a = this;
    return a.f.oa ? a.f.oa(b, c, d, e, g, h, k, l, m, n, p, q) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q);
  }
  function n(a, b, c, d, e, g, h, k, l, m, n, p) {
    a = this;
    return a.f.na ? a.f.na(b, c, d, e, g, h, k, l, m, n, p) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p);
  }
  function p(a, b, c, d, e, g, h, k, l, m, n) {
    a = this;
    return a.f.ma ? a.f.ma(b, c, d, e, g, h, k, l, m, n) : a.f.call(null, b, c, d, e, g, h, k, l, m, n);
  }
  function q(a, b, c, d, e, g, h, k, l, m) {
    a = this;
    return a.f.Aa ? a.f.Aa(b, c, d, e, g, h, k, l, m) : a.f.call(null, b, c, d, e, g, h, k, l, m);
  }
  function r(a, b, c, d, e, g, h, k, l) {
    a = this;
    return a.f.za ? a.f.za(b, c, d, e, g, h, k, l) : a.f.call(null, b, c, d, e, g, h, k, l);
  }
  function u(a, b, c, d, e, g, h, k) {
    a = this;
    return a.f.ya ? a.f.ya(b, c, d, e, g, h, k) : a.f.call(null, b, c, d, e, g, h, k);
  }
  function v(a, b, c, d, e, g, h) {
    a = this;
    return a.f.xa ? a.f.xa(b, c, d, e, g, h) : a.f.call(null, b, c, d, e, g, h);
  }
  function z(a, b, c, d, e, g) {
    a = this;
    return a.f.aa ? a.f.aa(b, c, d, e, g) : a.f.call(null, b, c, d, e, g);
  }
  function B(a, b, c, d, e) {
    a = this;
    return a.f.L ? a.f.L(b, c, d, e) : a.f.call(null, b, c, d, e);
  }
  function F(a, b, c, d) {
    a = this;
    return a.f.o ? a.f.o(b, c, d) : a.f.call(null, b, c, d);
  }
  function K(a, b, c) {
    a = this;
    return a.f.h ? a.f.h(b, c) : a.f.call(null, b, c);
  }
  function aa(a, b) {
    a = this;
    return a.f.j ? a.f.j(b) : a.f.call(null, b);
  }
  function xa(a) {
    a = this;
    return a.f.F ? a.f.F() : a.f.call(null);
  }
  var w = null, w = function(w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma, Va, eb, sb, Vb, vc, Sc, Id, re) {
    switch(arguments.length) {
      case 1:
        return xa.call(this, w);
      case 2:
        return aa.call(this, w, R);
      case 3:
        return K.call(this, w, R, U);
      case 4:
        return F.call(this, w, R, U, W);
      case 5:
        return B.call(this, w, R, U, W, Z);
      case 6:
        return z.call(this, w, R, U, W, Z, ca);
      case 7:
        return v.call(this, w, R, U, W, Z, ca, ia);
      case 8:
        return u.call(this, w, R, U, W, Z, ca, ia, ja);
      case 9:
        return r.call(this, w, R, U, W, Z, ca, ia, ja, ma);
      case 10:
        return q.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa);
      case 11:
        return p.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra);
      case 12:
        return n.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa);
      case 13:
        return m.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea);
      case 14:
        return l.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma);
      case 15:
        return k.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma, Va);
      case 16:
        return h.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma, Va, eb);
      case 17:
        return g.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma, Va, eb, sb);
      case 18:
        return e.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma, Va, eb, sb, Vb);
      case 19:
        return d.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma, Va, eb, sb, Vb, vc);
      case 20:
        return c.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma, Va, eb, sb, Vb, vc, Sc);
      case 21:
        return b.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma, Va, eb, sb, Vb, vc, Sc, Id);
      case 22:
        return a.call(this, w, R, U, W, Z, ca, ia, ja, ma, pa, ra, wa, Ea, Ma, Va, eb, sb, Vb, vc, Sc, Id, re);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  w.j = xa;
  w.h = aa;
  w.o = K;
  w.L = F;
  w.aa = B;
  w.xa = z;
  w.ya = v;
  w.za = u;
  w.Aa = r;
  w.ma = q;
  w.na = p;
  w.oa = n;
  w.pa = m;
  w.qa = l;
  w.ra = k;
  w.sa = h;
  w.ta = g;
  w.ua = e;
  w.va = d;
  w.wa = c;
  w.ob = b;
  w.Sa = a;
  return w;
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(D(b)));
};
f.F = function() {
  return this.f.F ? this.f.F() : this.f.call(null);
};
f.j = function(a) {
  return this.f.j ? this.f.j(a) : this.f.call(null, a);
};
f.h = function(a, b) {
  return this.f.h ? this.f.h(a, b) : this.f.call(null, a, b);
};
f.o = function(a, b, c) {
  return this.f.o ? this.f.o(a, b, c) : this.f.call(null, a, b, c);
};
f.L = function(a, b, c, d) {
  return this.f.L ? this.f.L(a, b, c, d) : this.f.call(null, a, b, c, d);
};
f.aa = function(a, b, c, d, e) {
  return this.f.aa ? this.f.aa(a, b, c, d, e) : this.f.call(null, a, b, c, d, e);
};
f.xa = function(a, b, c, d, e, g) {
  return this.f.xa ? this.f.xa(a, b, c, d, e, g) : this.f.call(null, a, b, c, d, e, g);
};
f.ya = function(a, b, c, d, e, g, h) {
  return this.f.ya ? this.f.ya(a, b, c, d, e, g, h) : this.f.call(null, a, b, c, d, e, g, h);
};
f.za = function(a, b, c, d, e, g, h, k) {
  return this.f.za ? this.f.za(a, b, c, d, e, g, h, k) : this.f.call(null, a, b, c, d, e, g, h, k);
};
f.Aa = function(a, b, c, d, e, g, h, k, l) {
  return this.f.Aa ? this.f.Aa(a, b, c, d, e, g, h, k, l) : this.f.call(null, a, b, c, d, e, g, h, k, l);
};
f.ma = function(a, b, c, d, e, g, h, k, l, m) {
  return this.f.ma ? this.f.ma(a, b, c, d, e, g, h, k, l, m) : this.f.call(null, a, b, c, d, e, g, h, k, l, m);
};
f.na = function(a, b, c, d, e, g, h, k, l, m, n) {
  return this.f.na ? this.f.na(a, b, c, d, e, g, h, k, l, m, n) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n);
};
f.oa = function(a, b, c, d, e, g, h, k, l, m, n, p) {
  return this.f.oa ? this.f.oa(a, b, c, d, e, g, h, k, l, m, n, p) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p);
};
f.pa = function(a, b, c, d, e, g, h, k, l, m, n, p, q) {
  return this.f.pa ? this.f.pa(a, b, c, d, e, g, h, k, l, m, n, p, q) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q);
};
f.qa = function(a, b, c, d, e, g, h, k, l, m, n, p, q, r) {
  return this.f.qa ? this.f.qa(a, b, c, d, e, g, h, k, l, m, n, p, q, r) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, r);
};
f.ra = function(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u) {
  return this.f.ra ? this.f.ra(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, r, u);
};
f.sa = function(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v) {
  return this.f.sa ? this.f.sa(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v);
};
f.ta = function(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z) {
  return this.f.ta ? this.f.ta(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z);
};
f.ua = function(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B) {
  return this.f.ua ? this.f.ua(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B);
};
f.va = function(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F) {
  return this.f.va ? this.f.va(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F);
};
f.wa = function(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K) {
  return this.f.wa ? this.f.wa(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K);
};
f.ob = function(a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K, aa) {
  var xa = this.f;
  return kc.Sa ? kc.Sa(xa, a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K, aa) : kc.call(null, xa, a, b, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K, aa);
};
function lc(a) {
  var b = null != a;
  return (b ? a ? a.m & 131072 || a.tb || (a.m ? 0 : y(Ta, a)) : y(Ta, a) : b) ? Ua(a) : null;
}
function mc(a) {
  return null == a ? !1 : a ? a.m & 1024 || a.rb ? !0 : a.m ? !1 : y(La, a) : y(La, a);
}
function nc(a) {
  return a ? a.m & 16384 || a.Gb ? !0 : a.m ? !1 : y(Qa, a) : y(Qa, a);
}
function oc(a) {
  return a ? a.A & 512 || a.Bb ? !0 : !1 : !1;
}
function pc(a) {
  var b = [];
  fa(a, function(a, b) {
    return function(a, c) {
      return b.push(c);
    };
  }(a, b));
  return b;
}
function qc(a, b, c, d, e) {
  for (;0 !== e;) {
    c[d] = a[b], d += 1, --e, b += 1;
  }
}
var rc = {};
function sc(a) {
  return x(a) ? !0 : !1;
}
function tc(a, b) {
  var c = L(b);
  if (c) {
    var d = N(c), c = O(c);
    return uc ? uc(a, d, c) : wc.call(null, a, d, c);
  }
  return a.F ? a.F() : a.call(null);
}
function xc(a, b, c) {
  for (c = L(c);;) {
    if (c) {
      var d = N(c);
      b = a.h ? a.h(b, d) : a.call(null, b, d);
      c = O(c);
    } else {
      return b;
    }
  }
}
function wc() {
  switch(arguments.length) {
    case 2:
      var a = arguments[0], b = arguments[1];
      return b && (b.m & 524288 || b.vb) ? b.T(null, a) : ya(b) ? Sb(b, a) : "string" === typeof b ? Sb(b, a) : y(Ya, b) ? Za.h(b, a) : tc(a, b);
    case 3:
      return uc(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
}
function uc(a, b, c) {
  return c && (c.m & 524288 || c.vb) ? c.U(null, a, b) : ya(c) ? Tb(c, a, b) : "string" === typeof c ? Tb(c, a, b) : y(Ya, c) ? Za.o(c, a, b) : xc(a, b, c);
}
function yc(a) {
  return a;
}
function zc(a) {
  a = (a - a % 2) / 2;
  return 0 <= a ? Math.floor(a) : Math.ceil(a);
}
function Ac(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24;
}
var C = function C() {
  switch(arguments.length) {
    case 0:
      return C.F();
    case 1:
      return C.j(arguments[0]);
    default:
      var b = new M(Array.prototype.slice.call(arguments, 1), 0);
      return C.C(arguments[0], b);
  }
};
C.F = function() {
  return "";
};
C.j = function(a) {
  return null == a ? "" : ea(a);
};
C.C = function(a, b) {
  for (var c = new ga("" + C(a)), d = b;;) {
    if (x(d)) {
      c = c.append("" + C(N(d))), d = O(d);
    } else {
      return c.toString();
    }
  }
};
C.R = function(a) {
  var b = N(a);
  a = O(a);
  return C.C(b, a);
};
C.Y = 1;
function Yb(a, b) {
  var c;
  if (b ? b.m & 16777216 || b.Fb || (b.m ? 0 : y(db, b)) : y(db, b)) {
    if (Wb(a) && Wb(b) && T(a) !== T(b)) {
      c = !1;
    } else {
      a: {
        c = L(a);
        for (var d = L(b);;) {
          if (null == c) {
            c = null == d;
            break a;
          }
          if (null != d && P.h(N(c), N(d))) {
            c = O(c), d = O(d);
          } else {
            c = !1;
            break a;
          }
        }
      }
    }
  } else {
    c = null;
  }
  return sc(c);
}
function Bc(a, b, c, d, e) {
  this.meta = a;
  this.first = b;
  this.Ba = c;
  this.count = d;
  this.v = e;
  this.m = 65937646;
  this.A = 8192;
}
f = Bc.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.meta;
};
f.ba = function() {
  return 1 === this.count ? null : this.Ba;
};
f.X = function() {
  return this.count;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.V = function() {
  return this.first;
};
f.ca = function() {
  return 1 === this.count ? Ib : this.Ba;
};
f.O = function() {
  return this;
};
f.P = function(a, b) {
  return new Bc(b, this.first, this.Ba, this.count, this.v);
};
f.K = function(a, b) {
  return new Bc(this.meta, b, this, this.count + 1, null);
};
Bc.prototype[Aa] = function() {
  return Q(this);
};
function Cc(a) {
  this.meta = a;
  this.m = 65937614;
  this.A = 8192;
}
f = Cc.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.meta;
};
f.ba = function() {
  return null;
};
f.X = function() {
  return 0;
};
f.G = function() {
  return Mb;
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.V = function() {
  return null;
};
f.ca = function() {
  return Ib;
};
f.O = function() {
  return null;
};
f.P = function(a, b) {
  return new Cc(b);
};
f.K = function(a, b) {
  return new Bc(this.meta, b, null, 1, null);
};
var Ib = new Cc(null);
Cc.prototype[Aa] = function() {
  return Q(this);
};
function Dc() {
  var a = 0 < arguments.length ? new M(Array.prototype.slice.call(arguments, 0), 0) : null;
  a: {
    var b;
    if (a instanceof M && 0 === a.i) {
      b = a.c;
    } else {
      b: {
        for (b = [];;) {
          if (null != a) {
            b.push(a.V(null)), a = a.ba(null);
          } else {
            break b;
          }
        }
      }
    }
    for (var a = b.length, c = Ib;;) {
      if (0 < a) {
        var d = a - 1, c = c.K(null, b[a - 1]), a = d
      } else {
        break a;
      }
    }
  }
  return c;
}
function Ec(a, b, c, d) {
  this.meta = a;
  this.first = b;
  this.Ba = c;
  this.v = d;
  this.m = 65929452;
  this.A = 8192;
}
f = Ec.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.meta;
};
f.ba = function() {
  return null == this.Ba ? null : L(this.Ba);
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.V = function() {
  return this.first;
};
f.ca = function() {
  return null == this.Ba ? Ib : this.Ba;
};
f.O = function() {
  return this;
};
f.P = function(a, b) {
  return new Ec(b, this.first, this.Ba, this.v);
};
f.K = function(a, b) {
  return new Ec(null, b, this, this.v);
};
Ec.prototype[Aa] = function() {
  return Q(this);
};
function S(a, b) {
  var c = null == b;
  return (c ? c : b && (b.m & 64 || b.Va)) ? new Ec(null, a, b, null) : new Ec(null, a, L(b), null);
}
function V(a, b, c, d) {
  this.Qa = a;
  this.name = b;
  this.Ea = c;
  this.Ka = d;
  this.m = 2153775105;
  this.A = 4096;
}
f = V.prototype;
f.toString = function() {
  return [C(":"), C(this.Ea)].join("");
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.w = function(a, b) {
  return b instanceof V ? this.Ea === b.Ea : !1;
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return ec(c, this);
      case 3:
        return fc(c, this, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return ec(c, this);
  };
  a.o = function(a, c, d) {
    return fc(c, this, d);
  };
  return a;
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(D(b)));
};
f.j = function(a) {
  return ec(a, this);
};
f.h = function(a, b) {
  return fc(a, this, b);
};
f.G = function() {
  var a = this.Ka;
  return null != a ? a : this.Ka = a = Fb(Ab(this.name), Db(this.Qa)) + 2654435769 | 0;
};
f.D = function(a, b) {
  return J(b, [C(":"), C(this.Ea)].join(""));
};
var Fc = function Fc() {
  switch(arguments.length) {
    case 1:
      return Fc.j(arguments[0]);
    case 2:
      return Fc.h(arguments[0], arguments[1]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
};
Fc.j = function(a) {
  if (a instanceof V) {
    return a;
  }
  if (a instanceof Gb) {
    var b;
    if (a && (a.A & 4096 || a.ub)) {
      b = a.Qa;
    } else {
      throw Error([C("Doesn't support namespace: "), C(a)].join(""));
    }
    return new V(b, Gc.j ? Gc.j(a) : Gc.call(null, a), a.Ga, null);
  }
  return "string" === typeof a ? (b = a.split("/"), 2 === b.length ? new V(b[0], b[1], a, null) : new V(null, b[0], a, null)) : null;
};
Fc.h = function(a, b) {
  return new V(a, b, [C(x(a) ? [C(a), C("/")].join("") : null), C(b)].join(""), null);
};
Fc.Y = 2;
function Hc(a, b, c, d) {
  this.meta = a;
  this.fn = b;
  this.s = c;
  this.v = d;
  this.m = 32374988;
  this.A = 0;
}
f = Hc.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
function Ic(a) {
  null != a.fn && (a.s = a.fn.F ? a.fn.F() : a.fn.call(null), a.fn = null);
  return a.s;
}
f.J = function() {
  return this.meta;
};
f.ba = function() {
  cb(this);
  return null == this.s ? null : O(this.s);
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.V = function() {
  cb(this);
  return null == this.s ? null : N(this.s);
};
f.ca = function() {
  cb(this);
  return null != this.s ? Hb(this.s) : Ib;
};
f.O = function() {
  Ic(this);
  if (null == this.s) {
    return null;
  }
  for (var a = this.s;;) {
    if (a instanceof Hc) {
      a = Ic(a);
    } else {
      return this.s = a, L(this.s);
    }
  }
};
f.P = function(a, b) {
  return new Hc(b, this.fn, this.s, this.v);
};
f.K = function(a, b) {
  return S(b, this);
};
Hc.prototype[Aa] = function() {
  return Q(this);
};
function Jc(a, b) {
  this.Ya = a;
  this.end = b;
  this.m = 2;
  this.A = 0;
}
Jc.prototype.add = function(a) {
  this.Ya[this.end] = a;
  return this.end += 1;
};
Jc.prototype.la = function() {
  var a = new Kc(this.Ya, 0, this.end);
  this.Ya = null;
  return a;
};
Jc.prototype.X = function() {
  return this.end;
};
function Kc(a, b, c) {
  this.c = a;
  this.off = b;
  this.end = c;
  this.m = 524306;
  this.A = 0;
}
f = Kc.prototype;
f.X = function() {
  return this.end - this.off;
};
f.S = function(a, b) {
  return this.c[this.off + b];
};
f.ea = function(a, b, c) {
  return 0 <= b && b < this.end - this.off ? this.c[this.off + b] : c;
};
f.gb = function() {
  if (this.off === this.end) {
    throw Error("-drop-first of empty chunk");
  }
  return new Kc(this.c, this.off + 1, this.end);
};
f.T = function(a, b) {
  return Ub(this.c, b, this.c[this.off], this.off + 1);
};
f.U = function(a, b, c) {
  return Ub(this.c, b, c, this.off);
};
function Lc(a, b, c, d) {
  this.la = a;
  this.ka = b;
  this.meta = c;
  this.v = d;
  this.m = 31850732;
  this.A = 1536;
}
f = Lc.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.meta;
};
f.ba = function() {
  if (1 < Da(this.la)) {
    return new Lc(nb(this.la), this.ka, this.meta, null);
  }
  var a = cb(this.ka);
  return null == a ? null : a;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.V = function() {
  return E.h(this.la, 0);
};
f.ca = function() {
  return 1 < Da(this.la) ? new Lc(nb(this.la), this.ka, this.meta, null) : null == this.ka ? Ib : this.ka;
};
f.O = function() {
  return this;
};
f.$a = function() {
  return this.la;
};
f.ab = function() {
  return null == this.ka ? Ib : this.ka;
};
f.P = function(a, b) {
  return new Lc(this.la, this.ka, b, this.v);
};
f.K = function(a, b) {
  return S(b, this);
};
f.Za = function() {
  return null == this.ka ? null : this.ka;
};
Lc.prototype[Aa] = function() {
  return Q(this);
};
function Mc(a, b) {
  return 0 === Da(a) ? b : new Lc(a, b, null, null);
}
function Nc(a, b) {
  a.add(b);
}
function Oc(a) {
  for (var b = [];;) {
    if (L(a)) {
      b.push(N(a)), a = O(a);
    } else {
      return b;
    }
  }
}
function Pc(a, b) {
  if (Wb(a)) {
    return T(a);
  }
  for (var c = a, d = b, e = 0;;) {
    if (0 < d && L(c)) {
      c = O(c), --d, e += 1;
    } else {
      return e;
    }
  }
}
var Qc = function Qc(b) {
  return null == b ? null : null == O(b) ? L(N(b)) : S(N(b), Qc(O(b)));
};
function Rc(a, b, c) {
  var d = L(c);
  if (0 === b) {
    return a.F ? a.F() : a.call(null);
  }
  c = G(d);
  var e = H(d);
  if (1 === b) {
    return a.j ? a.j(c) : a.j ? a.j(c) : a.call(null, c);
  }
  var d = G(e), g = H(e);
  if (2 === b) {
    return a.h ? a.h(c, d) : a.h ? a.h(c, d) : a.call(null, c, d);
  }
  var e = G(g), h = H(g);
  if (3 === b) {
    return a.o ? a.o(c, d, e) : a.o ? a.o(c, d, e) : a.call(null, c, d, e);
  }
  var g = G(h), k = H(h);
  if (4 === b) {
    return a.L ? a.L(c, d, e, g) : a.L ? a.L(c, d, e, g) : a.call(null, c, d, e, g);
  }
  var h = G(k), l = H(k);
  if (5 === b) {
    return a.aa ? a.aa(c, d, e, g, h) : a.aa ? a.aa(c, d, e, g, h) : a.call(null, c, d, e, g, h);
  }
  var k = G(l), m = H(l);
  if (6 === b) {
    return a.xa ? a.xa(c, d, e, g, h, k) : a.xa ? a.xa(c, d, e, g, h, k) : a.call(null, c, d, e, g, h, k);
  }
  var l = G(m), n = H(m);
  if (7 === b) {
    return a.ya ? a.ya(c, d, e, g, h, k, l) : a.ya ? a.ya(c, d, e, g, h, k, l) : a.call(null, c, d, e, g, h, k, l);
  }
  var m = G(n), p = H(n);
  if (8 === b) {
    return a.za ? a.za(c, d, e, g, h, k, l, m) : a.za ? a.za(c, d, e, g, h, k, l, m) : a.call(null, c, d, e, g, h, k, l, m);
  }
  var n = G(p), q = H(p);
  if (9 === b) {
    return a.Aa ? a.Aa(c, d, e, g, h, k, l, m, n) : a.Aa ? a.Aa(c, d, e, g, h, k, l, m, n) : a.call(null, c, d, e, g, h, k, l, m, n);
  }
  var p = G(q), r = H(q);
  if (10 === b) {
    return a.ma ? a.ma(c, d, e, g, h, k, l, m, n, p) : a.ma ? a.ma(c, d, e, g, h, k, l, m, n, p) : a.call(null, c, d, e, g, h, k, l, m, n, p);
  }
  var q = G(r), u = H(r);
  if (11 === b) {
    return a.na ? a.na(c, d, e, g, h, k, l, m, n, p, q) : a.na ? a.na(c, d, e, g, h, k, l, m, n, p, q) : a.call(null, c, d, e, g, h, k, l, m, n, p, q);
  }
  var r = G(u), v = H(u);
  if (12 === b) {
    return a.oa ? a.oa(c, d, e, g, h, k, l, m, n, p, q, r) : a.oa ? a.oa(c, d, e, g, h, k, l, m, n, p, q, r) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, r);
  }
  var u = G(v), z = H(v);
  if (13 === b) {
    return a.pa ? a.pa(c, d, e, g, h, k, l, m, n, p, q, r, u) : a.pa ? a.pa(c, d, e, g, h, k, l, m, n, p, q, r, u) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, r, u);
  }
  var v = G(z), B = H(z);
  if (14 === b) {
    return a.qa ? a.qa(c, d, e, g, h, k, l, m, n, p, q, r, u, v) : a.qa ? a.qa(c, d, e, g, h, k, l, m, n, p, q, r, u, v) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, r, u, v);
  }
  var z = G(B), F = H(B);
  if (15 === b) {
    return a.ra ? a.ra(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z) : a.ra ? a.ra(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z);
  }
  var B = G(F), K = H(F);
  if (16 === b) {
    return a.sa ? a.sa(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B) : a.sa ? a.sa(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B);
  }
  var F = G(K), aa = H(K);
  if (17 === b) {
    return a.ta ? a.ta(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F) : a.ta ? a.ta(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F);
  }
  var K = G(aa), xa = H(aa);
  if (18 === b) {
    return a.ua ? a.ua(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K) : a.ua ? a.ua(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K);
  }
  aa = G(xa);
  xa = H(xa);
  if (19 === b) {
    return a.va ? a.va(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K, aa) : a.va ? a.va(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K, aa) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K, aa);
  }
  var w = G(xa);
  H(xa);
  if (20 === b) {
    return a.wa ? a.wa(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K, aa, w) : a.wa ? a.wa(c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K, aa, w) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, r, u, v, z, B, F, K, aa, w);
  }
  throw Error("Only up to 20 arguments supported on functions");
}
function kc() {
  switch(arguments.length) {
    case 2:
      return Tc(arguments[0], arguments[1]);
    case 3:
      return Uc(arguments[0], arguments[1], arguments[2]);
    case 4:
      var a;
      a = arguments[0];
      var b = S(arguments[1], S(arguments[2], arguments[3])), c = a.Y;
      if (a.R) {
        var d = Pc(b, c + 1);
        a = d <= c ? Rc(a, d, b) : a.R(b);
      } else {
        a = a.apply(a, Oc(b));
      }
      return a;
    case 5:
      return a = arguments[0], b = S(arguments[1], S(arguments[2], S(arguments[3], arguments[4]))), c = a.Y, a.R ? (d = Pc(b, c + 1), a = d <= c ? Rc(a, d, b) : a.R(b)) : a = a.apply(a, Oc(b)), a;
    default:
      return b = new M(Array.prototype.slice.call(arguments, 5), 0), a = arguments[0], b = S(arguments[1], S(arguments[2], S(arguments[3], S(arguments[4], Qc(b))))), c = a.Y, a.R ? (d = Pc(b, c + 1), a = d <= c ? Rc(a, d, b) : a.R(b)) : a = a.apply(a, Oc(b)), a;
  }
}
function Tc(a, b) {
  var c = a.Y;
  if (a.R) {
    var d = Pc(b, c + 1);
    return d <= c ? Rc(a, d, b) : a.R(b);
  }
  return a.apply(a, Oc(b));
}
function Uc(a, b, c) {
  b = S(b, c);
  c = a.Y;
  if (a.R) {
    var d = Pc(b, c + 1);
    return d <= c ? Rc(a, d, b) : a.R(b);
  }
  return a.apply(a, Oc(b));
}
function Vc(a, b) {
  for (;;) {
    if (null == L(b)) {
      return !0;
    }
    var c;
    c = N(b);
    c = a.j ? a.j(c) : a.call(null, c);
    if (x(c)) {
      c = a;
      var d = O(b);
      a = c;
      b = d;
    } else {
      return !1;
    }
  }
}
function Wc(a, b, c, d) {
  this.state = a;
  this.meta = b;
  this.Ab = c;
  this.kb = d;
  this.A = 16386;
  this.m = 6455296;
}
f = Wc.prototype;
f.equiv = function(a) {
  return this.w(null, a);
};
f.w = function(a, b) {
  return this === b;
};
f.nb = function() {
  return this.state;
};
f.J = function() {
  return this.meta;
};
f.ib = function(a, b, c) {
  for (var d = L(this.kb), e = null, g = 0, h = 0;;) {
    if (h < g) {
      a = e.S(null, h);
      var k = dc(a, 0);
      a = dc(a, 1);
      var l = b, m = c;
      a.L ? a.L(k, this, l, m) : a.call(null, k, this, l, m);
      h += 1;
    } else {
      if (a = L(d)) {
        d = a, oc(d) ? (e = ob(d), d = pb(d), a = e, g = T(e), e = a) : (a = N(d), k = dc(a, 0), a = dc(a, 1), e = k, g = b, h = c, a.L ? a.L(e, this, g, h) : a.call(null, e, this, g, h), d = O(d), e = null, g = 0), h = 0;
      } else {
        return null;
      }
    }
  }
};
f.G = function() {
  return this[ba] || (this[ba] = ++da);
};
function Xc() {
  switch(arguments.length) {
    case 1:
      return Yc(arguments[0]);
    default:
      var a = new M(Array.prototype.slice.call(arguments, 1), 0), b = arguments[0], c = a, c = (null == c ? 0 : c ? c.m & 64 || c.Va || (c.m ? 0 : y(Ha, c)) : y(Ha, c)) ? Tc(Zc, a) : a, a = ec(c, ta), c = ec(c, $c);
      return new Wc(b, a, c, null);
  }
}
function Yc(a) {
  return new Wc(a, null, null, null);
}
function ad(a, b) {
  if (a instanceof Wc) {
    var c = a.Ab;
    if (null != c && !x(c.j ? c.j(b) : c.call(null, b))) {
      throw Error([C("Assert failed: "), C("Validator rejected reference state"), C("\n"), C(function() {
        var a = Dc(new Gb(null, "validate", "validate", 1439230700, null), new Gb(null, "new-value", "new-value", -1567397401, null));
        return bd.j ? bd.j(a) : bd.call(null, a);
      }())].join(""));
    }
    c = a.state;
    a.state = b;
    null != a.kb && hb(a, c, b);
    return b;
  }
  return rb(a, b);
}
var X = function X() {
  switch(arguments.length) {
    case 1:
      return X.j(arguments[0]);
    case 2:
      return X.h(arguments[0], arguments[1]);
    case 3:
      return X.o(arguments[0], arguments[1], arguments[2]);
    case 4:
      return X.L(arguments[0], arguments[1], arguments[2], arguments[3]);
    default:
      var b = new M(Array.prototype.slice.call(arguments, 4), 0);
      return X.C(arguments[0], arguments[1], arguments[2], arguments[3], b);
  }
};
X.j = function(a) {
  return function(b) {
    return function() {
      function c(c, d) {
        var e = a.j ? a.j(d) : a.call(null, d);
        return b.h ? b.h(c, e) : b.call(null, c, e);
      }
      function d(a) {
        return b.j ? b.j(a) : b.call(null, a);
      }
      function e() {
        return b.F ? b.F() : b.call(null);
      }
      var g = null, h = function() {
        function c(a, b, e) {
          var g = null;
          if (2 < arguments.length) {
            for (var g = 0, h = Array(arguments.length - 2);g < h.length;) {
              h[g] = arguments[g + 2], ++g;
            }
            g = new M(h, 0);
          }
          return d.call(this, a, b, g);
        }
        function d(c, e, g) {
          e = Uc(a, e, g);
          return b.h ? b.h(c, e) : b.call(null, c, e);
        }
        c.Y = 2;
        c.R = function(a) {
          var b = N(a);
          a = O(a);
          var c = N(a);
          a = Hb(a);
          return d(b, c, a);
        };
        c.C = d;
        return c;
      }(), g = function(a, b, g) {
        switch(arguments.length) {
          case 0:
            return e.call(this);
          case 1:
            return d.call(this, a);
          case 2:
            return c.call(this, a, b);
          default:
            var n = null;
            if (2 < arguments.length) {
              for (var n = 0, p = Array(arguments.length - 2);n < p.length;) {
                p[n] = arguments[n + 2], ++n;
              }
              n = new M(p, 0);
            }
            return h.C(a, b, n);
        }
        throw Error("Invalid arity: " + arguments.length);
      };
      g.Y = 2;
      g.R = h.R;
      g.F = e;
      g.j = d;
      g.h = c;
      g.C = h.C;
      return g;
    }();
  };
};
X.h = function(a, b) {
  return new Hc(null, function() {
    var c = L(b);
    if (c) {
      if (oc(c)) {
        for (var d = ob(c), e = T(d), g = new Jc(Array(e), 0), h = 0;;) {
          if (h < e) {
            Nc(g, function() {
              var b = E.h(d, h);
              return a.j ? a.j(b) : a.call(null, b);
            }()), h += 1;
          } else {
            break;
          }
        }
        return Mc(g.la(), X.h(a, pb(c)));
      }
      return S(function() {
        var b = N(c);
        return a.j ? a.j(b) : a.call(null, b);
      }(), X.h(a, Hb(c)));
    }
    return null;
  }, null, null);
};
X.o = function(a, b, c) {
  return new Hc(null, function() {
    var d = L(b), e = L(c);
    if (d && e) {
      var g = S, h;
      h = N(d);
      var k = N(e);
      h = a.h ? a.h(h, k) : a.call(null, h, k);
      d = g(h, X.o(a, Hb(d), Hb(e)));
    } else {
      d = null;
    }
    return d;
  }, null, null);
};
X.L = function(a, b, c, d) {
  return new Hc(null, function() {
    var e = L(b), g = L(c), h = L(d);
    if (e && g && h) {
      var k = S, l;
      l = N(e);
      var m = N(g), n = N(h);
      l = a.o ? a.o(l, m, n) : a.call(null, l, m, n);
      e = k(l, X.L(a, Hb(e), Hb(g), Hb(h)));
    } else {
      e = null;
    }
    return e;
  }, null, null);
};
X.C = function(a, b, c, d, e) {
  var g = function k(a) {
    return new Hc(null, function() {
      var b = X.h(L, a);
      return Vc(yc, b) ? S(X.h(N, b), k(X.h(Hb, b))) : null;
    }, null, null);
  };
  return X.h(function() {
    return function(b) {
      return Tc(a, b);
    };
  }(g), g(ac.C(e, d, $b([c, b], 0))));
};
X.R = function(a) {
  var b = N(a), c = O(a);
  a = N(c);
  var d = O(c), c = N(d), e = O(d), d = N(e), e = O(e);
  return X.C(b, a, c, d, e);
};
X.Y = 4;
function cd(a, b) {
  this.B = a;
  this.c = b;
}
function dd(a) {
  return new cd(a, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
}
function ed(a) {
  a = a.l;
  return 32 > a ? 0 : a - 1 >>> 5 << 5;
}
function fd(a, b, c) {
  for (;;) {
    if (0 === b) {
      return c;
    }
    var d = dd(a);
    d.c[0] = c;
    c = d;
    b -= 5;
  }
}
var gd = function gd(b, c, d, e) {
  var g = new cd(d.B, D(d.c)), h = b.l - 1 >>> c & 31;
  5 === c ? g.c[h] = e : (d = d.c[h], b = null != d ? gd(b, c - 5, d, e) : fd(null, c - 5, e), g.c[h] = b);
  return g;
};
function hd(a, b) {
  throw Error([C("No item "), C(a), C(" in vector of length "), C(b)].join(""));
}
function id(a, b) {
  if (b >= ed(a)) {
    return a.Z;
  }
  for (var c = a.root, d = a.shift;;) {
    if (0 < d) {
      var e = d - 5, c = c.c[b >>> d & 31], d = e
    } else {
      return c.c;
    }
  }
}
function jd(a, b) {
  return 0 <= b && b < a.l ? id(a, b) : hd(b, a.l);
}
var kd = function kd(b, c, d, e, g) {
  var h = new cd(d.B, D(d.c));
  if (0 === c) {
    h.c[e & 31] = g;
  } else {
    var k = e >>> c & 31;
    b = kd(b, c - 5, d.c[k], e, g);
    h.c[k] = b;
  }
  return h;
};
function ld(a, b, c, d, e, g) {
  this.i = a;
  this.base = b;
  this.c = c;
  this.Ca = d;
  this.start = e;
  this.end = g;
}
ld.prototype.fb = function() {
  return this.i < this.end;
};
ld.prototype.next = function() {
  32 === this.i - this.base && (this.c = id(this.Ca, this.i), this.base += 32);
  var a = this.c[this.i & 31];
  this.i += 1;
  return a;
};
function md(a, b, c, d, e, g) {
  this.meta = a;
  this.l = b;
  this.shift = c;
  this.root = d;
  this.Z = e;
  this.v = g;
  this.m = 167668511;
  this.A = 8196;
}
f = md.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.M = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  return "number" === typeof b ? E.o(this, b, c) : c;
};
f.S = function(a, b) {
  return jd(this, b)[b & 31];
};
f.ea = function(a, b, c) {
  return 0 <= b && b < this.l ? id(this, b)[b & 31] : c;
};
f.eb = function(a, b, c) {
  if (0 <= b && b < this.l) {
    return ed(this) <= b ? (a = D(this.Z), a[b & 31] = c, new md(this.meta, this.l, this.shift, this.root, a, null)) : new md(this.meta, this.l, this.shift, kd(this, this.shift, this.root, b, c), this.Z, null);
  }
  if (b === this.l) {
    return Fa(this, c);
  }
  throw Error([C("Index "), C(b), C(" out of bounds  [0,"), C(this.l), C("]")].join(""));
};
f.Ta = function() {
  var a = this.l;
  return new ld(0, 0, 0 < T(this) ? id(this, 0) : null, this, 0, a);
};
f.J = function() {
  return this.meta;
};
f.X = function() {
  return this.l;
};
f.bb = function() {
  return E.h(this, 0);
};
f.cb = function() {
  return E.h(this, 1);
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Lb(this);
};
f.w = function(a, b) {
  if (b instanceof md) {
    if (this.l === T(b)) {
      for (var c = tb(this), d = tb(b);;) {
        if (x(c.fb())) {
          var e = c.next(), g = d.next();
          if (!P.h(e, g)) {
            return !1;
          }
        } else {
          return !0;
        }
      }
    } else {
      return !1;
    }
  } else {
    return Yb(this, b);
  }
};
f.Ra = function() {
  var a = this;
  return new nd(a.l, a.shift, function() {
    var b = a.root;
    return od.j ? od.j(b) : od.call(null, b);
  }(), function() {
    var b = a.Z;
    return pd.j ? pd.j(b) : pd.call(null, b);
  }());
};
f.T = function(a, b) {
  return Qb(this, b);
};
f.U = function(a, b, c) {
  a = 0;
  for (var d = c;;) {
    if (a < this.l) {
      var e = id(this, a);
      c = e.length;
      a: {
        for (var g = 0;;) {
          if (g < c) {
            var h = e[g], d = b.h ? b.h(d, h) : b.call(null, d, h), g = g + 1
          } else {
            e = d;
            break a;
          }
        }
      }
      a += c;
      d = e;
    } else {
      return d;
    }
  }
};
f.Na = function(a, b, c) {
  if ("number" === typeof b) {
    return Ra(this, b, c);
  }
  throw Error("Vector's key for assoc must be a number.");
};
f.O = function() {
  if (0 === this.l) {
    return null;
  }
  if (32 >= this.l) {
    return new M(this.Z, 0);
  }
  var a;
  a: {
    a = this.root;
    for (var b = this.shift;;) {
      if (0 < b) {
        b -= 5, a = a.c[0];
      } else {
        a = a.c;
        break a;
      }
    }
  }
  return qd ? qd(this, a, 0, 0) : rd.call(null, this, a, 0, 0);
};
f.P = function(a, b) {
  return new md(b, this.l, this.shift, this.root, this.Z, this.v);
};
f.K = function(a, b) {
  if (32 > this.l - ed(this)) {
    for (var c = this.Z.length, d = Array(c + 1), e = 0;;) {
      if (e < c) {
        d[e] = this.Z[e], e += 1;
      } else {
        break;
      }
    }
    d[c] = b;
    return new md(this.meta, this.l + 1, this.shift, this.root, d, null);
  }
  c = (d = this.l >>> 5 > 1 << this.shift) ? this.shift + 5 : this.shift;
  d ? (d = dd(null), d.c[0] = this.root, e = fd(null, this.shift, new cd(null, this.Z)), d.c[1] = e) : d = gd(this, this.shift, this.root, new cd(null, this.Z));
  return new md(this.meta, this.l + 1, c, d, [b], null);
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.S(null, c);
      case 3:
        return this.ea(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.S(null, c);
  };
  a.o = function(a, c, d) {
    return this.ea(null, c, d);
  };
  return a;
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(D(b)));
};
f.j = function(a) {
  return this.S(null, a);
};
f.h = function(a, b) {
  return this.ea(null, a, b);
};
var sd = new cd(null, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]), bc = new md(null, 0, 5, sd, [], Mb);
md.prototype[Aa] = function() {
  return Q(this);
};
function td(a, b, c, d, e, g) {
  this.ga = a;
  this.node = b;
  this.i = c;
  this.off = d;
  this.meta = e;
  this.v = g;
  this.m = 32375020;
  this.A = 1536;
}
f = td.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.meta;
};
f.ba = function() {
  if (this.off + 1 < this.node.length) {
    var a;
    a = this.ga;
    var b = this.node, c = this.i, d = this.off + 1;
    a = qd ? qd(a, b, c, d) : rd.call(null, a, b, c, d);
    return null == a ? null : a;
  }
  return qb(this);
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  var c;
  c = this.ga;
  var d = this.i + this.off, e = T(this.ga);
  c = ud ? ud(c, d, e) : vd.call(null, c, d, e);
  return Qb(c, b);
};
f.U = function(a, b, c) {
  a = this.ga;
  var d = this.i + this.off, e = T(this.ga);
  a = ud ? ud(a, d, e) : vd.call(null, a, d, e);
  return Rb(a, b, c);
};
f.V = function() {
  return this.node[this.off];
};
f.ca = function() {
  if (this.off + 1 < this.node.length) {
    var a;
    a = this.ga;
    var b = this.node, c = this.i, d = this.off + 1;
    a = qd ? qd(a, b, c, d) : rd.call(null, a, b, c, d);
    return null == a ? Ib : a;
  }
  return pb(this);
};
f.O = function() {
  return this;
};
f.$a = function() {
  var a = this.node;
  return new Kc(a, this.off, a.length);
};
f.ab = function() {
  var a = this.i + this.node.length;
  if (a < Da(this.ga)) {
    var b = this.ga, c = id(this.ga, a);
    return qd ? qd(b, c, a, 0) : rd.call(null, b, c, a, 0);
  }
  return Ib;
};
f.P = function(a, b) {
  var c = this.ga, d = this.node, e = this.i, g = this.off;
  return wd ? wd(c, d, e, g, b) : rd.call(null, c, d, e, g, b);
};
f.K = function(a, b) {
  return S(b, this);
};
f.Za = function() {
  var a = this.i + this.node.length;
  if (a < Da(this.ga)) {
    var b = this.ga, c = id(this.ga, a);
    return qd ? qd(b, c, a, 0) : rd.call(null, b, c, a, 0);
  }
  return null;
};
td.prototype[Aa] = function() {
  return Q(this);
};
function rd() {
  switch(arguments.length) {
    case 3:
      var a = arguments[0], b = arguments[1], c = arguments[2];
      return new td(a, jd(a, b), b, c, null, null);
    case 4:
      return qd(arguments[0], arguments[1], arguments[2], arguments[3]);
    case 5:
      return wd(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
}
function qd(a, b, c, d) {
  return new td(a, b, c, d, null, null);
}
function wd(a, b, c, d, e) {
  return new td(a, b, c, d, e, null);
}
function xd(a, b, c, d, e) {
  this.meta = a;
  this.Ca = b;
  this.start = c;
  this.end = d;
  this.v = e;
  this.m = 167666463;
  this.A = 8192;
}
f = xd.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.M = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  return "number" === typeof b ? E.o(this, b, c) : c;
};
f.S = function(a, b) {
  return 0 > b || this.end <= this.start + b ? hd(b, this.end - this.start) : E.h(this.Ca, this.start + b);
};
f.ea = function(a, b, c) {
  return 0 > b || this.end <= this.start + b ? c : E.o(this.Ca, this.start + b, c);
};
f.eb = function(a, b, c) {
  var d = this.start + b;
  a = this.meta;
  c = gc.o(this.Ca, d, c);
  b = this.start;
  var e = this.end, d = d + 1, d = e > d ? e : d;
  return yd.aa ? yd.aa(a, c, b, d, null) : yd.call(null, a, c, b, d, null);
};
f.J = function() {
  return this.meta;
};
f.X = function() {
  return this.end - this.start;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return Qb(this, b);
};
f.U = function(a, b, c) {
  return Rb(this, b, c);
};
f.Na = function(a, b, c) {
  if ("number" === typeof b) {
    return Ra(this, b, c);
  }
  throw Error("Subvec's key for assoc must be a number.");
};
f.O = function() {
  var a = this;
  return function(b) {
    return function d(e) {
      return e === a.end ? null : S(E.h(a.Ca, e), new Hc(null, function() {
        return function() {
          return d(e + 1);
        };
      }(b), null, null));
    };
  }(this)(a.start);
};
f.P = function(a, b) {
  var c = this.Ca, d = this.start, e = this.end, g = this.v;
  return yd.aa ? yd.aa(b, c, d, e, g) : yd.call(null, b, c, d, e, g);
};
f.K = function(a, b) {
  var c = this.meta, d = Ra(this.Ca, this.end, b), e = this.start, g = this.end + 1;
  return yd.aa ? yd.aa(c, d, e, g, null) : yd.call(null, c, d, e, g, null);
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.S(null, c);
      case 3:
        return this.ea(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.S(null, c);
  };
  a.o = function(a, c, d) {
    return this.ea(null, c, d);
  };
  return a;
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(D(b)));
};
f.j = function(a) {
  return this.S(null, a);
};
f.h = function(a, b) {
  return this.ea(null, a, b);
};
xd.prototype[Aa] = function() {
  return Q(this);
};
function yd(a, b, c, d, e) {
  for (;;) {
    if (b instanceof xd) {
      c = b.start + c, d = b.start + d, b = b.Ca;
    } else {
      var g = T(b);
      if (0 > c || 0 > d || c > g || d > g) {
        throw Error("Index out of bounds");
      }
      return new xd(a, b, c, d, e);
    }
  }
}
function vd() {
  switch(arguments.length) {
    case 2:
      var a = arguments[0];
      return ud(a, arguments[1], T(a));
    case 3:
      return ud(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
}
function ud(a, b, c) {
  return yd(null, a, b, c, null);
}
function zd(a, b) {
  return a === b.B ? b : new cd(a, D(b.c));
}
function od(a) {
  return new cd({}, D(a.c));
}
function pd(a) {
  var b = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  qc(a, 0, b, 0, a.length);
  return b;
}
var Ad = function Ad(b, c, d, e) {
  d = zd(b.root.B, d);
  var g = b.l - 1 >>> c & 31;
  if (5 === c) {
    b = e;
  } else {
    var h = d.c[g];
    b = null != h ? Ad(b, c - 5, h, e) : fd(b.root.B, c - 5, e);
  }
  d.c[g] = b;
  return d;
};
function nd(a, b, c, d) {
  this.l = a;
  this.shift = b;
  this.root = c;
  this.Z = d;
  this.A = 88;
  this.m = 275;
}
f = nd.prototype;
f.Wa = function(a, b) {
  if (this.root.B) {
    if (32 > this.l - ed(this)) {
      this.Z[this.l & 31] = b;
    } else {
      var c = new cd(this.root.B, this.Z), d = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      d[0] = b;
      this.Z = d;
      if (this.l >>> 5 > 1 << this.shift) {
        var d = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], e = this.shift + 5;
        d[0] = this.root;
        d[1] = fd(this.root.B, this.shift, c);
        this.root = new cd(this.root.B, d);
        this.shift = e;
      } else {
        this.root = Ad(this, this.shift, this.root, c);
      }
    }
    this.l += 1;
    return this;
  }
  throw Error("conj! after persistent!");
};
f.Xa = function() {
  if (this.root.B) {
    this.root.B = null;
    var a = this.l - ed(this), b = Array(a);
    qc(this.Z, 0, b, 0, a);
    return new md(null, this.l, this.shift, this.root, b, null);
  }
  throw Error("persistent! called twice");
};
f.Oa = function(a, b, c) {
  if ("number" === typeof b) {
    return mb(this, b, c);
  }
  throw Error("TransientVector's key for assoc! must be a number.");
};
f.hb = function(a, b, c) {
  var d = this;
  if (d.root.B) {
    if (0 <= b && b < d.l) {
      return ed(this) <= b ? d.Z[b & 31] = c : (a = function() {
        return function g(a, k) {
          var l = zd(d.root.B, k);
          if (0 === a) {
            l.c[b & 31] = c;
          } else {
            var m = b >>> a & 31, n = g(a - 5, l.c[m]);
            l.c[m] = n;
          }
          return l;
        };
      }(this).call(null, d.shift, d.root), d.root = a), this;
    }
    if (b === d.l) {
      return jb(this, c);
    }
    throw Error([C("Index "), C(b), C(" out of bounds for TransientVector of length"), C(d.l)].join(""));
  }
  throw Error("assoc! after persistent!");
};
f.X = function() {
  if (this.root.B) {
    return this.l;
  }
  throw Error("count after persistent!");
};
f.S = function(a, b) {
  if (this.root.B) {
    return jd(this, b)[b & 31];
  }
  throw Error("nth after persistent!");
};
f.ea = function(a, b, c) {
  return 0 <= b && b < this.l ? E.h(this, b) : c;
};
f.M = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  return "number" === typeof b ? E.o(this, b, c) : c;
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.M(null, c);
      case 3:
        return this.H(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.M(null, c);
  };
  a.o = function(a, c, d) {
    return this.H(null, c, d);
  };
  return a;
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(D(b)));
};
f.j = function(a) {
  return this.M(null, a);
};
f.h = function(a, b) {
  return this.H(null, a, b);
};
function Bd() {
  this.m = 2097152;
  this.A = 0;
}
Bd.prototype.equiv = function(a) {
  return this.w(null, a);
};
Bd.prototype.w = function() {
  return !1;
};
var Cd = new Bd;
function Dd(a, b) {
  return sc(mc(b) ? T(a) === T(b) ? Vc(yc, X.h(function(a) {
    return P.h(fc(b, N(a), Cd), N(O(a)));
  }, a)) : null : null);
}
function Ed(a) {
  this.s = a;
}
Ed.prototype.next = function() {
  if (null != this.s) {
    var a = N(this.s), b = dc(a, 0), a = dc(a, 1);
    this.s = O(this.s);
    return {value:[b, a], done:!1};
  }
  return {value:null, done:!0};
};
function Fd(a) {
  return new Ed(L(a));
}
function Gd(a, b) {
  var c;
  if (b instanceof V) {
    a: {
      c = a.length;
      for (var d = b.Ea, e = 0;;) {
        if (c <= e) {
          c = -1;
          break a;
        }
        var g = a[e];
        if (g instanceof V && d === g.Ea) {
          c = e;
          break a;
        }
        e += 2;
      }
    }
  } else {
    if (c = "string" == typeof b, x(x(c) ? c : "number" === typeof b)) {
      a: {
        for (c = a.length, d = 0;;) {
          if (c <= d) {
            c = -1;
            break a;
          }
          if (b === a[d]) {
            c = d;
            break a;
          }
          d += 2;
        }
      }
    } else {
      if (b instanceof Gb) {
        a: {
          for (c = a.length, d = b.Ga, e = 0;;) {
            if (c <= e) {
              c = -1;
              break a;
            }
            g = a[e];
            if (g instanceof Gb && d === g.Ga) {
              c = e;
              break a;
            }
            e += 2;
          }
        }
      } else {
        if (null == b) {
          a: {
            for (c = a.length, d = 0;;) {
              if (c <= d) {
                c = -1;
                break a;
              }
              if (null == a[d]) {
                c = d;
                break a;
              }
              d += 2;
            }
          }
        } else {
          a: {
            for (c = a.length, d = 0;;) {
              if (c <= d) {
                c = -1;
                break a;
              }
              if (P.h(b, a[d])) {
                c = d;
                break a;
              }
              d += 2;
            }
          }
        }
      }
    }
  }
  return c;
}
function Hd(a, b, c) {
  this.c = a;
  this.i = b;
  this.da = c;
  this.m = 32374990;
  this.A = 0;
}
f = Hd.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.da;
};
f.ba = function() {
  return this.i < this.c.length - 2 ? new Hd(this.c, this.i + 2, this.da) : null;
};
f.X = function() {
  return (this.c.length - this.i) / 2;
};
f.G = function() {
  return Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.V = function() {
  return new md(null, 2, 5, sd, [this.c[this.i], this.c[this.i + 1]], null);
};
f.ca = function() {
  return this.i < this.c.length - 2 ? new Hd(this.c, this.i + 2, this.da) : Ib;
};
f.O = function() {
  return this;
};
f.P = function(a, b) {
  return new Hd(this.c, this.i, b);
};
f.K = function(a, b) {
  return S(b, this);
};
Hd.prototype[Aa] = function() {
  return Q(this);
};
function Jd(a, b, c) {
  this.c = a;
  this.i = b;
  this.l = c;
}
Jd.prototype.fb = function() {
  return this.i < this.l;
};
Jd.prototype.next = function() {
  var a = new md(null, 2, 5, sd, [this.c[this.i], this.c[this.i + 1]], null);
  this.i += 2;
  return a;
};
function oa(a, b, c, d) {
  this.meta = a;
  this.l = b;
  this.c = c;
  this.v = d;
  this.m = 16647951;
  this.A = 8196;
}
f = oa.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.keys = function() {
  return Q(Kd.j ? Kd.j(this) : Kd.call(null, this));
};
f.entries = function() {
  return Fd(L(this));
};
f.values = function() {
  return Q(Ld.j ? Ld.j(this) : Ld.call(null, this));
};
f.has = function(a) {
  return fc(this, a, rc) === rc ? !1 : !0;
};
f.get = function(a, b) {
  return this.H(null, a, b);
};
f.forEach = function(a) {
  for (var b = L(this), c = null, d = 0, e = 0;;) {
    if (e < d) {
      var g = c.S(null, e), h = dc(g, 0), g = dc(g, 1);
      a.h ? a.h(g, h) : a.call(null, g, h);
      e += 1;
    } else {
      if (b = L(b)) {
        oc(b) ? (c = ob(b), b = pb(b), h = c, d = T(c), c = h) : (c = N(b), h = dc(c, 0), c = g = dc(c, 1), a.h ? a.h(c, h) : a.call(null, c, h), b = O(b), c = null, d = 0), e = 0;
      } else {
        return null;
      }
    }
  }
};
f.M = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  a = Gd(this.c, b);
  return -1 === a ? c : this.c[a + 1];
};
f.Ta = function() {
  return new Jd(this.c, 0, 2 * this.l);
};
f.J = function() {
  return this.meta;
};
f.X = function() {
  return this.l;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  if (b && (b.m & 1024 || b.rb)) {
    var c = this.c.length;
    if (this.l === b.X(null)) {
      for (var d = 0;;) {
        if (d < c) {
          var e = b.H(null, this.c[d], rc);
          if (e !== rc) {
            if (P.h(this.c[d + 1], e)) {
              d += 2;
            } else {
              return !1;
            }
          } else {
            return !1;
          }
        } else {
          return !0;
        }
      }
    } else {
      return !1;
    }
  } else {
    return Dd(this, b);
  }
};
f.Ra = function() {
  return new Md({}, this.c.length, D(this.c));
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.Na = function(a, b, c) {
  a = Gd(this.c, b);
  if (-1 === a) {
    if (this.l < Nd) {
      a = this.c;
      for (var d = a.length, e = Array(d + 2), g = 0;;) {
        if (g < d) {
          e[g] = a[g], g += 1;
        } else {
          break;
        }
      }
      e[d] = b;
      e[d + 1] = c;
      return new oa(this.meta, this.l + 1, e, null);
    }
    a = hc;
    null != a ? a && (a.A & 4 || a.Cb) ? (d = uc(jb, ib(a), this), d = kb(d), a = lc(a), a = ic(d) && !(d ? d.m & 262144 || d.Hb || (d.m ? 0 : y(Wa, d)) : y(Wa, d)) ? new jc(d, a) : null == d ? null : Xa(d, a)) : a = uc(Fa, a, this) : a = uc(ac, Ib, this);
    return Xa(Ka(a, b, c), this.meta);
  }
  if (c === this.c[a + 1]) {
    return this;
  }
  b = D(this.c);
  b[a + 1] = c;
  return new oa(this.meta, this.l, b, null);
};
f.O = function() {
  var a = this.c;
  return 0 <= a.length - 2 ? new Hd(a, 0, null) : null;
};
f.P = function(a, b) {
  return new oa(b, this.l, this.c, this.v);
};
f.K = function(a, b) {
  if (nc(b)) {
    return Ka(this, E.h(b, 0), E.h(b, 1));
  }
  for (var c = this, d = L(b);;) {
    if (null == d) {
      return c;
    }
    var e = N(d);
    if (nc(e)) {
      c = Ka(c, E.h(e, 0), E.h(e, 1)), d = O(d);
    } else {
      throw Error("conj on a map takes map entries or seqables of map entries");
    }
  }
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.M(null, c);
      case 3:
        return this.H(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.M(null, c);
  };
  a.o = function(a, c, d) {
    return this.H(null, c, d);
  };
  return a;
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(D(b)));
};
f.j = function(a) {
  return this.M(null, a);
};
f.h = function(a, b) {
  return this.H(null, a, b);
};
var Nd = 8;
oa.prototype[Aa] = function() {
  return Q(this);
};
function Md(a, b, c) {
  this.La = a;
  this.Ma = b;
  this.c = c;
  this.m = 258;
  this.A = 56;
}
f = Md.prototype;
f.X = function() {
  if (x(this.La)) {
    return zc(this.Ma);
  }
  throw Error("count after persistent!");
};
f.M = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  if (x(this.La)) {
    return a = Gd(this.c, b), -1 === a ? c : this.c[a + 1];
  }
  throw Error("lookup after persistent!");
};
f.Wa = function(a, b) {
  if (x(this.La)) {
    if (b ? b.m & 2048 || b.sb || (b.m ? 0 : y(Na, b)) : y(Na, b)) {
      return lb(this, Od.j ? Od.j(b) : Od.call(null, b), Pd.j ? Pd.j(b) : Pd.call(null, b));
    }
    for (var c = L(b), d = this;;) {
      var e = N(c);
      if (x(e)) {
        var g = e, c = O(c), d = lb(d, function() {
          var a = g;
          return Od.j ? Od.j(a) : Od.call(null, a);
        }(), function() {
          var a = g;
          return Pd.j ? Pd.j(a) : Pd.call(null, a);
        }())
      } else {
        return d;
      }
    }
  } else {
    throw Error("conj! after persistent!");
  }
};
f.Xa = function() {
  if (x(this.La)) {
    return this.La = !1, new oa(null, zc(this.Ma), this.c, null);
  }
  throw Error("persistent! called twice");
};
f.Oa = function(a, b, c) {
  if (x(this.La)) {
    a = Gd(this.c, b);
    if (-1 === a) {
      if (this.Ma + 2 <= 2 * Nd) {
        return this.Ma += 2, this.c.push(b), this.c.push(c), this;
      }
      a = this.Ma;
      var d = this.c;
      a = Qd.h ? Qd.h(a, d) : Qd.call(null, a, d);
      return lb(a, b, c);
    }
    c !== this.c[a + 1] && (this.c[a + 1] = c);
    return this;
  }
  throw Error("assoc! after persistent!");
};
function Qd(a, b) {
  for (var c = ib(hc), d = 0;;) {
    if (d < a) {
      c = lb(c, b[d], b[d + 1]), d += 2;
    } else {
      return c;
    }
  }
}
function Rd() {
  this.val = !1;
}
function Sd(a, b) {
  return a === b ? !0 : a === b || a instanceof V && b instanceof V && a.Ea === b.Ea ? !0 : P.h(a, b);
}
function Td(a, b, c) {
  a = D(a);
  a[b] = c;
  return a;
}
function Ud(a, b, c, d) {
  a = a.Ia(b);
  a.c[c] = d;
  return a;
}
function Vd(a, b, c) {
  this.B = a;
  this.I = b;
  this.c = c;
}
f = Vd.prototype;
f.Ia = function(a) {
  if (a === this.B) {
    return this;
  }
  var b = Ac(this.I), c = Array(0 > b ? 4 : 2 * (b + 1));
  qc(this.c, 0, c, 0, 2 * b);
  return new Vd(a, this.I, c);
};
f.Pa = function() {
  var a = this.c;
  return Wd ? Wd(a) : Xd.call(null, a);
};
f.Ja = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if (0 === (this.I & e)) {
    return d;
  }
  var g = Ac(this.I & e - 1), e = this.c[2 * g], g = this.c[2 * g + 1];
  return null == e ? g.Ja(a + 5, b, c, d) : Sd(c, e) ? g : d;
};
f.ja = function(a, b, c, d, e, g) {
  var h = 1 << (c >>> b & 31), k = Ac(this.I & h - 1);
  if (0 === (this.I & h)) {
    var l = Ac(this.I);
    if (2 * l < this.c.length) {
      a = this.Ia(a);
      b = a.c;
      g.val = !0;
      a: {
        for (c = 2 * (l - k), g = 2 * k + (c - 1), l = 2 * (k + 1) + (c - 1);;) {
          if (0 === c) {
            break a;
          }
          b[l] = b[g];
          --l;
          --c;
          --g;
        }
      }
      b[2 * k] = d;
      b[2 * k + 1] = e;
      a.I |= h;
      return a;
    }
    if (16 <= l) {
      k = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      k[c >>> b & 31] = Yd.ja(a, b + 5, c, d, e, g);
      for (e = d = 0;;) {
        if (32 > d) {
          0 !== (this.I >>> d & 1) && (k[d] = null != this.c[e] ? Yd.ja(a, b + 5, Eb(this.c[e]), this.c[e], this.c[e + 1], g) : this.c[e + 1], e += 2), d += 1;
        } else {
          break;
        }
      }
      return new Zd(a, l + 1, k);
    }
    b = Array(2 * (l + 4));
    qc(this.c, 0, b, 0, 2 * k);
    b[2 * k] = d;
    b[2 * k + 1] = e;
    qc(this.c, 2 * k, b, 2 * (k + 1), 2 * (l - k));
    g.val = !0;
    a = this.Ia(a);
    a.c = b;
    a.I |= h;
    return a;
  }
  l = this.c[2 * k];
  h = this.c[2 * k + 1];
  if (null == l) {
    return l = h.ja(a, b + 5, c, d, e, g), l === h ? this : Ud(this, a, 2 * k + 1, l);
  }
  if (Sd(d, l)) {
    return e === h ? this : Ud(this, a, 2 * k + 1, e);
  }
  g.val = !0;
  g = b + 5;
  d = $d ? $d(a, g, l, h, c, d, e) : ae.call(null, a, g, l, h, c, d, e);
  e = 2 * k;
  k = 2 * k + 1;
  a = this.Ia(a);
  a.c[e] = null;
  a.c[k] = d;
  return a;
};
f.ia = function(a, b, c, d, e) {
  var g = 1 << (b >>> a & 31), h = Ac(this.I & g - 1);
  if (0 === (this.I & g)) {
    var k = Ac(this.I);
    if (16 <= k) {
      h = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      h[b >>> a & 31] = Yd.ia(a + 5, b, c, d, e);
      for (d = c = 0;;) {
        if (32 > c) {
          0 !== (this.I >>> c & 1) && (h[c] = null != this.c[d] ? Yd.ia(a + 5, Eb(this.c[d]), this.c[d], this.c[d + 1], e) : this.c[d + 1], d += 2), c += 1;
        } else {
          break;
        }
      }
      return new Zd(null, k + 1, h);
    }
    a = Array(2 * (k + 1));
    qc(this.c, 0, a, 0, 2 * h);
    a[2 * h] = c;
    a[2 * h + 1] = d;
    qc(this.c, 2 * h, a, 2 * (h + 1), 2 * (k - h));
    e.val = !0;
    return new Vd(null, this.I | g, a);
  }
  var l = this.c[2 * h], g = this.c[2 * h + 1];
  if (null == l) {
    return k = g.ia(a + 5, b, c, d, e), k === g ? this : new Vd(null, this.I, Td(this.c, 2 * h + 1, k));
  }
  if (Sd(c, l)) {
    return d === g ? this : new Vd(null, this.I, Td(this.c, 2 * h + 1, d));
  }
  e.val = !0;
  e = this.I;
  k = this.c;
  a += 5;
  a = be ? be(a, l, g, b, c, d) : ae.call(null, a, l, g, b, c, d);
  c = 2 * h;
  h = 2 * h + 1;
  d = D(k);
  d[c] = null;
  d[h] = a;
  return new Vd(null, e, d);
};
var Yd = new Vd(null, 0, []);
function Zd(a, b, c) {
  this.B = a;
  this.l = b;
  this.c = c;
}
f = Zd.prototype;
f.Ia = function(a) {
  return a === this.B ? this : new Zd(a, this.l, D(this.c));
};
f.Pa = function() {
  var a = this.c;
  return ce ? ce(a) : de.call(null, a);
};
f.Ja = function(a, b, c, d) {
  var e = this.c[b >>> a & 31];
  return null != e ? e.Ja(a + 5, b, c, d) : d;
};
f.ja = function(a, b, c, d, e, g) {
  var h = c >>> b & 31, k = this.c[h];
  if (null == k) {
    return a = Ud(this, a, h, Yd.ja(a, b + 5, c, d, e, g)), a.l += 1, a;
  }
  b = k.ja(a, b + 5, c, d, e, g);
  return b === k ? this : Ud(this, a, h, b);
};
f.ia = function(a, b, c, d, e) {
  var g = b >>> a & 31, h = this.c[g];
  if (null == h) {
    return new Zd(null, this.l + 1, Td(this.c, g, Yd.ia(a + 5, b, c, d, e)));
  }
  a = h.ia(a + 5, b, c, d, e);
  return a === h ? this : new Zd(null, this.l, Td(this.c, g, a));
};
function ee(a, b, c) {
  b *= 2;
  for (var d = 0;;) {
    if (d < b) {
      if (Sd(c, a[d])) {
        return d;
      }
      d += 2;
    } else {
      return -1;
    }
  }
}
function fe(a, b, c, d) {
  this.B = a;
  this.Da = b;
  this.l = c;
  this.c = d;
}
f = fe.prototype;
f.Ia = function(a) {
  if (a === this.B) {
    return this;
  }
  var b = Array(2 * (this.l + 1));
  qc(this.c, 0, b, 0, 2 * this.l);
  return new fe(a, this.Da, this.l, b);
};
f.Pa = function() {
  var a = this.c;
  return Wd ? Wd(a) : Xd.call(null, a);
};
f.Ja = function(a, b, c, d) {
  a = ee(this.c, this.l, c);
  return 0 > a ? d : Sd(c, this.c[a]) ? this.c[a + 1] : d;
};
f.ja = function(a, b, c, d, e, g) {
  if (c === this.Da) {
    b = ee(this.c, this.l, d);
    if (-1 === b) {
      if (this.c.length > 2 * this.l) {
        return b = 2 * this.l, c = 2 * this.l + 1, a = this.Ia(a), a.c[b] = d, a.c[c] = e, g.val = !0, a.l += 1, a;
      }
      c = this.c.length;
      b = Array(c + 2);
      qc(this.c, 0, b, 0, c);
      b[c] = d;
      b[c + 1] = e;
      g.val = !0;
      d = this.l + 1;
      a === this.B ? (this.c = b, this.l = d, a = this) : a = new fe(this.B, this.Da, d, b);
      return a;
    }
    return this.c[b + 1] === e ? this : Ud(this, a, b + 1, e);
  }
  return (new Vd(a, 1 << (this.Da >>> b & 31), [null, this, null, null])).ja(a, b, c, d, e, g);
};
f.ia = function(a, b, c, d, e) {
  return b === this.Da ? (a = ee(this.c, this.l, c), -1 === a ? (a = 2 * this.l, b = Array(a + 2), qc(this.c, 0, b, 0, a), b[a] = c, b[a + 1] = d, e.val = !0, new fe(null, this.Da, this.l + 1, b)) : P.h(this.c[a], d) ? this : new fe(null, this.Da, this.l, Td(this.c, a + 1, d))) : (new Vd(null, 1 << (this.Da >>> a & 31), [null, this])).ia(a, b, c, d, e);
};
function ae() {
  switch(arguments.length) {
    case 6:
      return be(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    case 7:
      return $d(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
}
function be(a, b, c, d, e, g) {
  var h = Eb(b);
  if (h === d) {
    return new fe(null, h, 2, [b, c, e, g]);
  }
  var k = new Rd;
  return Yd.ia(a, h, b, c, k).ia(a, d, e, g, k);
}
function $d(a, b, c, d, e, g, h) {
  var k = Eb(c);
  if (k === e) {
    return new fe(null, k, 2, [c, d, g, h]);
  }
  var l = new Rd;
  return Yd.ja(a, b, k, c, d, l).ja(a, b, e, g, h, l);
}
function ge(a, b, c, d, e) {
  this.meta = a;
  this.Fa = b;
  this.i = c;
  this.s = d;
  this.v = e;
  this.m = 32374860;
  this.A = 0;
}
f = ge.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.meta;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.V = function() {
  return null == this.s ? new md(null, 2, 5, sd, [this.Fa[this.i], this.Fa[this.i + 1]], null) : N(this.s);
};
f.ca = function() {
  if (null == this.s) {
    var a = this.Fa, b = this.i + 2;
    return he ? he(a, b, null) : Xd.call(null, a, b, null);
  }
  var a = this.Fa, b = this.i, c = O(this.s);
  return he ? he(a, b, c) : Xd.call(null, a, b, c);
};
f.O = function() {
  return this;
};
f.P = function(a, b) {
  return new ge(b, this.Fa, this.i, this.s, this.v);
};
f.K = function(a, b) {
  return S(b, this);
};
ge.prototype[Aa] = function() {
  return Q(this);
};
function Xd() {
  switch(arguments.length) {
    case 1:
      return Wd(arguments[0]);
    case 3:
      return he(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
}
function Wd(a) {
  return he(a, 0, null);
}
function he(a, b, c) {
  if (null == c) {
    for (c = a.length;;) {
      if (b < c) {
        if (null != a[b]) {
          return new ge(null, a, b, null, null);
        }
        var d = a[b + 1];
        if (x(d) && (d = d.Pa(), x(d))) {
          return new ge(null, a, b + 2, d, null);
        }
        b += 2;
      } else {
        return null;
      }
    }
  } else {
    return new ge(null, a, b, c, null);
  }
}
function ie(a, b, c, d, e) {
  this.meta = a;
  this.Fa = b;
  this.i = c;
  this.s = d;
  this.v = e;
  this.m = 32374860;
  this.A = 0;
}
f = ie.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.meta;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.V = function() {
  return N(this.s);
};
f.ca = function() {
  var a = this.Fa, b = this.i, c = O(this.s);
  return je ? je(null, a, b, c) : de.call(null, null, a, b, c);
};
f.O = function() {
  return this;
};
f.P = function(a, b) {
  return new ie(b, this.Fa, this.i, this.s, this.v);
};
f.K = function(a, b) {
  return S(b, this);
};
ie.prototype[Aa] = function() {
  return Q(this);
};
function de() {
  switch(arguments.length) {
    case 1:
      return ce(arguments[0]);
    case 4:
      return je(arguments[0], arguments[1], arguments[2], arguments[3]);
    default:
      throw Error([C("Invalid arity: "), C(arguments.length)].join(""));;
  }
}
function ce(a) {
  return je(null, a, 0, null);
}
function je(a, b, c, d) {
  if (null == d) {
    for (d = b.length;;) {
      if (c < d) {
        var e = b[c];
        if (x(e) && (e = e.Pa(), x(e))) {
          return new ie(a, b, c + 1, e, null);
        }
        c += 1;
      } else {
        return null;
      }
    }
  } else {
    return new ie(a, b, c, d, null);
  }
}
function ke(a, b, c, d, e, g) {
  this.meta = a;
  this.l = b;
  this.root = c;
  this.fa = d;
  this.ha = e;
  this.v = g;
  this.m = 16123663;
  this.A = 8196;
}
f = ke.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.keys = function() {
  return Q(Kd.j ? Kd.j(this) : Kd.call(null, this));
};
f.entries = function() {
  return Fd(L(this));
};
f.values = function() {
  return Q(Ld.j ? Ld.j(this) : Ld.call(null, this));
};
f.has = function(a) {
  return fc(this, a, rc) === rc ? !1 : !0;
};
f.get = function(a, b) {
  return this.H(null, a, b);
};
f.forEach = function(a) {
  for (var b = L(this), c = null, d = 0, e = 0;;) {
    if (e < d) {
      var g = c.S(null, e), h = dc(g, 0), g = dc(g, 1);
      a.h ? a.h(g, h) : a.call(null, g, h);
      e += 1;
    } else {
      if (b = L(b)) {
        oc(b) ? (c = ob(b), b = pb(b), h = c, d = T(c), c = h) : (c = N(b), h = dc(c, 0), c = g = dc(c, 1), a.h ? a.h(c, h) : a.call(null, c, h), b = O(b), c = null, d = 0), e = 0;
      } else {
        return null;
      }
    }
  }
};
f.M = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  return null == b ? this.fa ? this.ha : c : null == this.root ? c : this.root.Ja(0, Eb(b), b, c);
};
f.J = function() {
  return this.meta;
};
f.X = function() {
  return this.l;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  return Dd(this, b);
};
f.Ra = function() {
  return new le({}, this.root, this.l, this.fa, this.ha);
};
f.Na = function(a, b, c) {
  if (null == b) {
    return this.fa && c === this.ha ? this : new ke(this.meta, this.fa ? this.l : this.l + 1, this.root, !0, c, null);
  }
  a = new Rd;
  b = (null == this.root ? Yd : this.root).ia(0, Eb(b), b, c, a);
  return b === this.root ? this : new ke(this.meta, a.val ? this.l + 1 : this.l, b, this.fa, this.ha, null);
};
f.O = function() {
  if (0 < this.l) {
    var a = null != this.root ? this.root.Pa() : null;
    return this.fa ? S(new md(null, 2, 5, sd, [null, this.ha], null), a) : a;
  }
  return null;
};
f.P = function(a, b) {
  return new ke(b, this.l, this.root, this.fa, this.ha, this.v);
};
f.K = function(a, b) {
  if (nc(b)) {
    return Ka(this, E.h(b, 0), E.h(b, 1));
  }
  for (var c = this, d = L(b);;) {
    if (null == d) {
      return c;
    }
    var e = N(d);
    if (nc(e)) {
      c = Ka(c, E.h(e, 0), E.h(e, 1)), d = O(d);
    } else {
      throw Error("conj on a map takes map entries or seqables of map entries");
    }
  }
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.M(null, c);
      case 3:
        return this.H(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.M(null, c);
  };
  a.o = function(a, c, d) {
    return this.H(null, c, d);
  };
  return a;
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(D(b)));
};
f.j = function(a) {
  return this.M(null, a);
};
f.h = function(a, b) {
  return this.H(null, a, b);
};
var hc = new ke(null, 0, null, !1, null, Ob);
ke.prototype[Aa] = function() {
  return Q(this);
};
function le(a, b, c, d, e) {
  this.B = a;
  this.root = b;
  this.count = c;
  this.fa = d;
  this.ha = e;
  this.m = 258;
  this.A = 56;
}
function me(a, b) {
  if (a.B) {
    if (b ? b.m & 2048 || b.sb || (b.m ? 0 : y(Na, b)) : y(Na, b)) {
      return ne(a, Od.j ? Od.j(b) : Od.call(null, b), Pd.j ? Pd.j(b) : Pd.call(null, b));
    }
    for (var c = L(b), d = a;;) {
      var e = N(c);
      if (x(e)) {
        var g = e, c = O(c), d = ne(d, function() {
          var a = g;
          return Od.j ? Od.j(a) : Od.call(null, a);
        }(), function() {
          var a = g;
          return Pd.j ? Pd.j(a) : Pd.call(null, a);
        }())
      } else {
        return d;
      }
    }
  } else {
    throw Error("conj! after persistent");
  }
}
function ne(a, b, c) {
  if (a.B) {
    if (null == b) {
      a.ha !== c && (a.ha = c), a.fa || (a.count += 1, a.fa = !0);
    } else {
      var d = new Rd;
      b = (null == a.root ? Yd : a.root).ja(a.B, 0, Eb(b), b, c, d);
      b !== a.root && (a.root = b);
      d.val && (a.count += 1);
    }
    return a;
  }
  throw Error("assoc! after persistent!");
}
f = le.prototype;
f.X = function() {
  if (this.B) {
    return this.count;
  }
  throw Error("count after persistent!");
};
f.M = function(a, b) {
  return null == b ? this.fa ? this.ha : null : null == this.root ? null : this.root.Ja(0, Eb(b), b);
};
f.H = function(a, b, c) {
  return null == b ? this.fa ? this.ha : c : null == this.root ? c : this.root.Ja(0, Eb(b), b, c);
};
f.Wa = function(a, b) {
  return me(this, b);
};
f.Xa = function() {
  var a;
  if (this.B) {
    this.B = null, a = new ke(null, this.count, this.root, this.fa, this.ha, null);
  } else {
    throw Error("persistent! called twice");
  }
  return a;
};
f.Oa = function(a, b, c) {
  return ne(this, b, c);
};
var Zc = function Zc() {
  var b = 0 < arguments.length ? new M(Array.prototype.slice.call(arguments, 0), 0) : null;
  return Zc.C(b);
};
Zc.C = function(a) {
  for (var b = L(a), c = ib(hc);;) {
    if (b) {
      a = O(O(b));
      var d = N(b), b = N(O(b)), c = lb(c, d, b), b = a;
    } else {
      return kb(c);
    }
  }
};
Zc.Y = 0;
Zc.R = function(a) {
  return Zc.C(L(a));
};
function oe(a, b) {
  this.W = a;
  this.da = b;
  this.m = 32374988;
  this.A = 0;
}
f = oe.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.da;
};
f.ba = function() {
  var a = this.W, a = (a ? a.m & 128 || a.Ua || (a.m ? 0 : y(Ia, a)) : y(Ia, a)) ? this.W.ba(null) : O(this.W);
  return null == a ? null : new oe(a, this.da);
};
f.G = function() {
  return Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.V = function() {
  return this.W.V(null).bb();
};
f.ca = function() {
  var a = this.W, a = (a ? a.m & 128 || a.Ua || (a.m ? 0 : y(Ia, a)) : y(Ia, a)) ? this.W.ba(null) : O(this.W);
  return null != a ? new oe(a, this.da) : Ib;
};
f.O = function() {
  return this;
};
f.P = function(a, b) {
  return new oe(this.W, b);
};
f.K = function(a, b) {
  return S(b, this);
};
oe.prototype[Aa] = function() {
  return Q(this);
};
function Kd(a) {
  return (a = L(a)) ? new oe(a, null) : null;
}
function Od(a) {
  return Oa(a);
}
function pe(a, b) {
  this.W = a;
  this.da = b;
  this.m = 32374988;
  this.A = 0;
}
f = pe.prototype;
f.toString = function() {
  return vb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function() {
  return this.da;
};
f.ba = function() {
  var a = this.W, a = (a ? a.m & 128 || a.Ua || (a.m ? 0 : y(Ia, a)) : y(Ia, a)) ? this.W.ba(null) : O(this.W);
  return null == a ? null : new pe(a, this.da);
};
f.G = function() {
  return Lb(this);
};
f.w = function(a, b) {
  return Yb(this, b);
};
f.T = function(a, b) {
  return tc(b, this);
};
f.U = function(a, b, c) {
  return xc(b, c, this);
};
f.V = function() {
  return this.W.V(null).cb();
};
f.ca = function() {
  var a = this.W, a = (a ? a.m & 128 || a.Ua || (a.m ? 0 : y(Ia, a)) : y(Ia, a)) ? this.W.ba(null) : O(this.W);
  return null != a ? new pe(a, this.da) : Ib;
};
f.O = function() {
  return this;
};
f.P = function(a, b) {
  return new pe(this.W, b);
};
f.K = function(a, b) {
  return S(b, this);
};
pe.prototype[Aa] = function() {
  return Q(this);
};
function Ld(a) {
  return (a = L(a)) ? new pe(a, null) : null;
}
function Pd(a) {
  return Pa(a);
}
function Gc(a) {
  if (a && (a.A & 4096 || a.ub)) {
    return a.name;
  }
  if ("string" === typeof a) {
    return a;
  }
  throw Error([C("Doesn't support name: "), C(a)].join(""));
}
function qe(a, b, c, d, e, g, h) {
  var k = ka;
  ka = null == ka ? null : ka - 1;
  try {
    if (null != ka && 0 > ka) {
      return J(a, "#");
    }
    J(a, c);
    if (0 === va.j(g)) {
      L(h) && J(a, function() {
        var a = se.j(g);
        return x(a) ? a : "...";
      }());
    } else {
      if (L(h)) {
        var l = N(h);
        b.o ? b.o(l, a, g) : b.call(null, l, a, g);
      }
      for (var m = O(h), n = va.j(g) - 1;;) {
        if (!m || null != n && 0 === n) {
          L(m) && 0 === n && (J(a, d), J(a, function() {
            var a = se.j(g);
            return x(a) ? a : "...";
          }()));
          break;
        } else {
          J(a, d);
          var p = N(m);
          c = a;
          h = g;
          b.o ? b.o(p, c, h) : b.call(null, p, c, h);
          var q = O(m);
          c = n - 1;
          m = q;
          n = c;
        }
      }
    }
    return J(a, e);
  } finally {
    ka = k;
  }
}
function te(a, b) {
  for (var c = L(b), d = null, e = 0, g = 0;;) {
    if (g < e) {
      var h = d.S(null, g);
      J(a, h);
      g += 1;
    } else {
      if (c = L(c)) {
        d = c, oc(d) ? (c = ob(d), e = pb(d), d = c, h = T(c), c = e, e = h) : (h = N(d), J(a, h), c = O(d), d = null, e = 0), g = 0;
      } else {
        return null;
      }
    }
  }
}
var ue = {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"};
function ve(a) {
  return [C('"'), C(a.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(a) {
    return ue[a];
  })), C('"')].join("");
}
function we(a, b, c) {
  if (null == a) {
    return J(b, "nil");
  }
  if (void 0 === a) {
    return J(b, "#\x3cundefined\x3e");
  }
  if (x(function() {
    var b = ec(c, ta);
    return x(b) ? (b = a ? a.m & 131072 || a.tb ? !0 : a.m ? !1 : y(Ta, a) : y(Ta, a)) ? lc(a) : b : b;
  }())) {
    J(b, "^");
    var d = lc(a);
    Y.o ? Y.o(d, b, c) : Y.call(null, d, b, c);
    J(b, " ");
  }
  return null == a ? J(b, "nil") : a.yb ? a.Ib(a, b, c) : a && (a.m & 2147483648 || a.N) ? a.D(null, b, c) : (null == a ? null : a.constructor) === Boolean || "number" === typeof a ? J(b, "" + C(a)) : null != a && a.constructor === Object ? (J(b, "#js "), d = X.h(function(b) {
    return new md(null, 2, 5, sd, [Fc.j(b), a[b]], null);
  }, pc(a)), xe.L ? xe.L(d, Y, b, c) : xe.call(null, d, Y, b, c)) : ya(a) ? qe(b, Y, "#js [", " ", "]", c, a) : x("string" == typeof a) ? x(sa.j(c)) ? J(b, ve(a)) : J(b, a) : ic(a) ? te(b, $b(["#\x3c", "" + C(a), "\x3e"], 0)) : a instanceof Date ? (d = function(a, b) {
    for (var c = "" + C(a);;) {
      if (T(c) < b) {
        c = [C("0"), C(c)].join("");
      } else {
        return c;
      }
    }
  }, te(b, $b(['#inst "', "" + C(a.getUTCFullYear()), "-", d(a.getUTCMonth() + 1, 2), "-", d(a.getUTCDate(), 2), "T", d(a.getUTCHours(), 2), ":", d(a.getUTCMinutes(), 2), ":", d(a.getUTCSeconds(), 2), ".", d(a.getUTCMilliseconds(), 3), "-", '00:00"'], 0))) : x(a instanceof RegExp) ? te(b, $b(['#"', a.source, '"'], 0)) : (a ? a.m & 2147483648 || a.N || (a.m ? 0 : y(fb, a)) : y(fb, a)) ? gb(a, b, c) : te(b, $b(["#\x3c", "" + C(a), "\x3e"], 0));
}
function Y(a, b, c) {
  var d = ye.j(c);
  return x(d) ? (c = gc.o(c, ze, we), d.o ? d.o(a, b, c) : d.call(null, a, b, c)) : we(a, b, c);
}
function bd() {
  var a = 0 < arguments.length ? new M(Array.prototype.slice.call(arguments, 0), 0) : null, b = na(), c;
  (c = null == a) || (c = L(a), c = x(c) ? !1 : !0);
  if (c) {
    c = "";
  } else {
    c = C;
    var d = b, b = new ga;
    a: {
      var e = a, a = new ub(b);
      Y(N(e), a, d);
      for (var e = L(O(e)), g = null, h = 0, k = 0;;) {
        if (k < h) {
          var l = g.S(null, k);
          J(a, " ");
          Y(l, a, d);
          k += 1;
        } else {
          if (e = L(e)) {
            g = e, oc(g) ? (e = ob(g), h = pb(g), g = e, l = T(e), e = h, h = l) : (l = N(g), J(a, " "), Y(l, a, d), e = O(g), g = null, h = 0), k = 0;
          } else {
            break a;
          }
        }
      }
    }
    c = "" + c(b);
  }
  return c;
}
function xe(a, b, c, d) {
  return qe(c, function(a, c, d) {
    var k = Oa(a);
    b.o ? b.o(k, c, d) : b.call(null, k, c, d);
    J(c, " ");
    a = Pa(a);
    return b.o ? b.o(a, c, d) : b.call(null, a, c, d);
  }, "{", ", ", "}", d, L(a));
}
M.prototype.N = !0;
M.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
Hc.prototype.N = !0;
Hc.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
ge.prototype.N = !0;
ge.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
Hd.prototype.N = !0;
Hd.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
td.prototype.N = !0;
td.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
Ec.prototype.N = !0;
Ec.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
ke.prototype.N = !0;
ke.prototype.D = function(a, b, c) {
  return xe(this, Y, b, c);
};
ie.prototype.N = !0;
ie.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
xd.prototype.N = !0;
xd.prototype.D = function(a, b, c) {
  return qe(b, Y, "[", " ", "]", c, this);
};
Lc.prototype.N = !0;
Lc.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
Wc.prototype.N = !0;
Wc.prototype.D = function(a, b, c) {
  J(b, "#\x3cAtom: ");
  Y(this.state, b, c);
  return J(b, "\x3e");
};
pe.prototype.N = !0;
pe.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
md.prototype.N = !0;
md.prototype.D = function(a, b, c) {
  return qe(b, Y, "[", " ", "]", c, this);
};
Cc.prototype.N = !0;
Cc.prototype.D = function(a, b) {
  return J(b, "()");
};
oa.prototype.N = !0;
oa.prototype.D = function(a, b, c) {
  return xe(this, Y, b, c);
};
oe.prototype.N = !0;
oe.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
Bc.prototype.N = !0;
Bc.prototype.D = function(a, b, c) {
  return qe(b, Y, "(", " ", ")", c, this);
};
var ta = new V(null, "meta", "meta", 1499536964), ua = new V(null, "dup", "dup", 556298533), $c = new V(null, "validator", "validator", -1966190681), ze = new V(null, "fallback-impl", "fallback-impl", -1501286995), qa = new V(null, "flush-on-newline", "flush-on-newline", -151457939), sa = new V(null, "readably", "readably", 1129599760), se = new V(null, "more-marker", "more-marker", -14717935), va = new V(null, "print-length", "print-length", 1931866356), ye = new V(null, "alt-impl", "alt-impl", 
670969595);
var Ae = Yc ? Yc(null) : Xc.call(null, null), Be = Yc ? Yc(null) : Xc.call(null, null), Ce = io("http://localhost:5150"), De = document.createElement("script"), Ee = N(Zb(document.getElementsByTagName("script"), 0));
function Fe(a) {
  a = a.target.getVideoData();
  if (P.h(Be, a.title)) {
    return null;
  }
  var b = a.title;
  ad.h ? ad.h(Be, b) : ad.call(null, Be, b);
  return Ce.emit("video-info", a);
}
window.onYouTubeIframeAPIReady = function() {
  Ce.emit("youtube-api-ready");
  return Ce.on("play", function(a) {
    return null == (Pb.j ? Pb.j(Ae) : Pb.call(null, Ae)) ? (a = new YT.Player("player", {videoId:a, playerVars:{autoplay:1, autohide:1}, events:{onStateChange:Fe}}), ad.h ? ad.h(Ae, a) : ad.call(null, Ae, a)) : (Pb.j ? Pb.j(Ae) : Pb.call(null, Ae)).loadVideoById(a);
  });
};
De.src = "https://www.youtube.com/iframe_api";
Ee.parentNode.insertBefore(De, Ee);

})();
