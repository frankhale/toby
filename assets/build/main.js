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
function r(a) {
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
var ca = "closure_uid_" + (1E9 * Math.random() >>> 0), ea = 0;
function fa(a) {
  return Array.prototype.join.call(arguments, "");
}
;function ga(a, b) {
  for (var c in a) {
    b.call(void 0, a[c], c, a);
  }
}
;function ha(a, b) {
  null != a && this.append.apply(this, arguments);
}
f = ha.prototype;
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
if ("undefined" === typeof ia) {
  var ia = function() {
    throw Error("No *print-fn* fn set for evaluation environment");
  }
}
var la = null;
if ("undefined" === typeof na) {
  var na = null
}
function oa() {
  return new qa(null, 5, [ra, !0, ta, !0, ua, !1, va, !1, wa, null], null);
}
function x(a) {
  return null != a && !1 !== a;
}
function xa(a) {
  return a instanceof Array;
}
function y(a, b) {
  return a[r(null == b ? null : b)] ? !0 : a._ ? !0 : !1;
}
function z(a, b) {
  var c = null == b ? null : b.constructor, c = x(x(c) ? c.Bb : c) ? c.Ab : r(b);
  return Error(["No protocol method ", a, " defined for type ", c, ": ", b].join(""));
}
function Aa(a) {
  var b = a.Ab;
  return x(b) ? b : "" + B(a);
}
var Ba = "undefined" !== typeof Symbol && "function" === r(Symbol) ? Symbol.iterator : "@@iterator";
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
var Ca = {}, Da = {}, Ea = function Ea(b) {
  if (b ? b.X : b) {
    return b.X(b);
  }
  var c;
  c = Ea[r(null == b ? null : b)];
  if (!c && (c = Ea._, !c)) {
    throw z("ICounted.-count", b);
  }
  return c.call(null, b);
}, Fa = {}, Ga = function Ga(b, c) {
  if (b ? b.L : b) {
    return b.L(b, c);
  }
  var d;
  d = Ga[r(null == b ? null : b)];
  if (!d && (d = Ga._, !d)) {
    throw z("ICollection.-conj", b);
  }
  return d.call(null, b, c);
}, Ia = {}, E = function E() {
  switch(arguments.length) {
    case 2:
      return E.h(arguments[0], arguments[1]);
    case 3:
      return E.o(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
};
E.h = function(a, b) {
  if (a ? a.J : a) {
    return a.J(a, b);
  }
  var c;
  c = E[r(null == a ? null : a)];
  if (!c && (c = E._, !c)) {
    throw z("IIndexed.-nth", a);
  }
  return c.call(null, a, b);
};
E.o = function(a, b, c) {
  if (a ? a.ea : a) {
    return a.ea(a, b, c);
  }
  var d;
  d = E[r(null == a ? null : a)];
  if (!d && (d = E._, !d)) {
    throw z("IIndexed.-nth", a);
  }
  return d.call(null, a, b, c);
};
E.Y = 3;
var Ja = {}, G = function G(b) {
  if (b ? b.V : b) {
    return b.V(b);
  }
  var c;
  c = G[r(null == b ? null : b)];
  if (!c && (c = G._, !c)) {
    throw z("ISeq.-first", b);
  }
  return c.call(null, b);
}, H = function H(b) {
  if (b ? b.ca : b) {
    return b.ca(b);
  }
  var c;
  c = H[r(null == b ? null : b)];
  if (!c && (c = H._, !c)) {
    throw z("ISeq.-rest", b);
  }
  return c.call(null, b);
}, Ka = {}, La = {}, I = function I() {
  switch(arguments.length) {
    case 2:
      return I.h(arguments[0], arguments[1]);
    case 3:
      return I.o(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
};
I.h = function(a, b) {
  if (a ? a.N : a) {
    return a.N(a, b);
  }
  var c;
  c = I[r(null == a ? null : a)];
  if (!c && (c = I._, !c)) {
    throw z("ILookup.-lookup", a);
  }
  return c.call(null, a, b);
};
I.o = function(a, b, c) {
  if (a ? a.H : a) {
    return a.H(a, b, c);
  }
  var d;
  d = I[r(null == a ? null : a)];
  if (!d && (d = I._, !d)) {
    throw z("ILookup.-lookup", a);
  }
  return d.call(null, a, b, c);
};
I.Y = 3;
var Ma = function Ma(b, c, d) {
  if (b ? b.Na : b) {
    return b.Na(b, c, d);
  }
  var e;
  e = Ma[r(null == b ? null : b)];
  if (!e && (e = Ma._, !e)) {
    throw z("IAssociative.-assoc", b);
  }
  return e.call(null, b, c, d);
}, Oa = {}, Pa = {}, Qa = function Qa(b) {
  if (b ? b.bb : b) {
    return b.bb();
  }
  var c;
  c = Qa[r(null == b ? null : b)];
  if (!c && (c = Qa._, !c)) {
    throw z("IMapEntry.-key", b);
  }
  return c.call(null, b);
}, Ra = function Ra(b) {
  if (b ? b.cb : b) {
    return b.cb();
  }
  var c;
  c = Ra[r(null == b ? null : b)];
  if (!c && (c = Ra._, !c)) {
    throw z("IMapEntry.-val", b);
  }
  return c.call(null, b);
}, Sa = {}, Ta = function Ta(b, c, d) {
  if (b ? b.eb : b) {
    return b.eb(b, c, d);
  }
  var e;
  e = Ta[r(null == b ? null : b)];
  if (!e && (e = Ta._, !e)) {
    throw z("IVector.-assoc-n", b);
  }
  return e.call(null, b, c, d);
}, Ua = function Ua(b) {
  if (b ? b.ob : b) {
    return b.state;
  }
  var c;
  c = Ua[r(null == b ? null : b)];
  if (!c && (c = Ua._, !c)) {
    throw z("IDeref.-deref", b);
  }
  return c.call(null, b);
}, Wa = {}, Xa = function Xa(b) {
  if (b ? b.K : b) {
    return b.K(b);
  }
  var c;
  c = Xa[r(null == b ? null : b)];
  if (!c && (c = Xa._, !c)) {
    throw z("IMeta.-meta", b);
  }
  return c.call(null, b);
}, Ya = {}, Za = function Za(b, c) {
  if (b ? b.R : b) {
    return b.R(b, c);
  }
  var d;
  d = Za[r(null == b ? null : b)];
  if (!d && (d = Za._, !d)) {
    throw z("IWithMeta.-with-meta", b);
  }
  return d.call(null, b, c);
}, $a = {}, ab = function ab() {
  switch(arguments.length) {
    case 2:
      return ab.h(arguments[0], arguments[1]);
    case 3:
      return ab.o(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
};
ab.h = function(a, b) {
  if (a ? a.T : a) {
    return a.T(a, b);
  }
  var c;
  c = ab[r(null == a ? null : a)];
  if (!c && (c = ab._, !c)) {
    throw z("IReduce.-reduce", a);
  }
  return c.call(null, a, b);
};
ab.o = function(a, b, c) {
  if (a ? a.U : a) {
    return a.U(a, b, c);
  }
  var d;
  d = ab[r(null == a ? null : a)];
  if (!d && (d = ab._, !d)) {
    throw z("IReduce.-reduce", a);
  }
  return d.call(null, a, b, c);
};
ab.Y = 3;
var bb = function bb(b, c) {
  if (b ? b.w : b) {
    return b.w(b, c);
  }
  var d;
  d = bb[r(null == b ? null : b)];
  if (!d && (d = bb._, !d)) {
    throw z("IEquiv.-equiv", b);
  }
  return d.call(null, b, c);
}, cb = function cb(b) {
  if (b ? b.G : b) {
    return b.G(b);
  }
  var c;
  c = cb[r(null == b ? null : b)];
  if (!c && (c = cb._, !c)) {
    throw z("IHash.-hash", b);
  }
  return c.call(null, b);
}, db = {}, eb = function eb(b) {
  if (b ? b.P : b) {
    return b.P(b);
  }
  var c;
  c = eb[r(null == b ? null : b)];
  if (!c && (c = eb._, !c)) {
    throw z("ISeqable.-seq", b);
  }
  return c.call(null, b);
}, fb = {}, J = function J(b, c) {
  if (b ? b.jb : b) {
    return b.jb(0, c);
  }
  var d;
  d = J[r(null == b ? null : b)];
  if (!d && (d = J._, !d)) {
    throw z("IWriter.-write", b);
  }
  return d.call(null, b, c);
}, gb = {}, ib = function ib(b, c, d) {
  if (b ? b.D : b) {
    return b.D(b, c, d);
  }
  var e;
  e = ib[r(null == b ? null : b)];
  if (!e && (e = ib._, !e)) {
    throw z("IPrintWithWriter.-pr-writer", b);
  }
  return e.call(null, b, c, d);
}, jb = function jb(b, c, d) {
  if (b ? b.ib : b) {
    return b.ib(0, c, d);
  }
  var e;
  e = jb[r(null == b ? null : b)];
  if (!e && (e = jb._, !e)) {
    throw z("IWatchable.-notify-watches", b);
  }
  return e.call(null, b, c, d);
}, kb = function kb(b) {
  if (b ? b.Ra : b) {
    return b.Ra(b);
  }
  var c;
  c = kb[r(null == b ? null : b)];
  if (!c && (c = kb._, !c)) {
    throw z("IEditableCollection.-as-transient", b);
  }
  return c.call(null, b);
}, lb = function lb(b, c) {
  if (b ? b.Wa : b) {
    return b.Wa(b, c);
  }
  var d;
  d = lb[r(null == b ? null : b)];
  if (!d && (d = lb._, !d)) {
    throw z("ITransientCollection.-conj!", b);
  }
  return d.call(null, b, c);
}, mb = function mb(b) {
  if (b ? b.Xa : b) {
    return b.Xa(b);
  }
  var c;
  c = mb[r(null == b ? null : b)];
  if (!c && (c = mb._, !c)) {
    throw z("ITransientCollection.-persistent!", b);
  }
  return c.call(null, b);
}, nb = function nb(b, c, d) {
  if (b ? b.Oa : b) {
    return b.Oa(b, c, d);
  }
  var e;
  e = nb[r(null == b ? null : b)];
  if (!e && (e = nb._, !e)) {
    throw z("ITransientAssociative.-assoc!", b);
  }
  return e.call(null, b, c, d);
}, ob = function ob(b, c, d) {
  if (b ? b.hb : b) {
    return b.hb(0, c, d);
  }
  var e;
  e = ob[r(null == b ? null : b)];
  if (!e && (e = ob._, !e)) {
    throw z("ITransientVector.-assoc-n!", b);
  }
  return e.call(null, b, c, d);
}, pb = function pb(b) {
  if (b ? b.gb : b) {
    return b.gb();
  }
  var c;
  c = pb[r(null == b ? null : b)];
  if (!c && (c = pb._, !c)) {
    throw z("IChunk.-drop-first", b);
  }
  return c.call(null, b);
}, qb = function qb(b) {
  if (b ? b.$a : b) {
    return b.$a(b);
  }
  var c;
  c = qb[r(null == b ? null : b)];
  if (!c && (c = qb._, !c)) {
    throw z("IChunkedSeq.-chunked-first", b);
  }
  return c.call(null, b);
}, rb = function rb(b) {
  if (b ? b.ab : b) {
    return b.ab(b);
  }
  var c;
  c = rb[r(null == b ? null : b)];
  if (!c && (c = rb._, !c)) {
    throw z("IChunkedSeq.-chunked-rest", b);
  }
  return c.call(null, b);
}, sb = function sb(b) {
  if (b ? b.Za : b) {
    return b.Za(b);
  }
  var c;
  c = sb[r(null == b ? null : b)];
  if (!c && (c = sb._, !c)) {
    throw z("IChunkedNext.-chunked-next", b);
  }
  return c.call(null, b);
}, tb = function tb(b, c) {
  if (b ? b.zb : b) {
    return b.zb(b, c);
  }
  var d;
  d = tb[r(null == b ? null : b)];
  if (!d && (d = tb._, !d)) {
    throw z("IReset.-reset!", b);
  }
  return d.call(null, b, c);
}, ub = function ub(b) {
  if (b ? b.Ta : b) {
    return b.Ta(b);
  }
  var c;
  c = ub[r(null == b ? null : b)];
  if (!c && (c = ub._, !c)) {
    throw z("IIterable.-iterator", b);
  }
  return c.call(null, b);
};
function vb(a) {
  this.Cb = a;
  this.m = 1073741824;
  this.A = 0;
}
vb.prototype.jb = function(a, b) {
  return this.Cb.append(b);
};
function xb(a) {
  var b = new ha;
  a.D(null, new vb(b), oa());
  return "" + B(b);
}
var yb = "undefined" !== typeof Math.imul && 0 !== Math.imul(4294967295, 5) ? function(a, b) {
  return Math.imul(a, b);
} : function(a, b) {
  var c = a & 65535, d = b & 65535;
  return c * d + ((a >>> 16 & 65535) * d + c * (b >>> 16 & 65535) << 16 >>> 0) | 0;
};
function zb(a) {
  a = yb(a | 0, -862048943);
  return yb(a << 15 | a >>> -15, 461845907);
}
function Ab(a, b) {
  var c = (a | 0) ^ (b | 0);
  return yb(c << 13 | c >>> -13, 5) + -430675100 | 0;
}
function Bb(a, b) {
  var c = (a | 0) ^ b, c = yb(c ^ c >>> 16, -2048144789), c = yb(c ^ c >>> 13, -1028477387);
  return c ^ c >>> 16;
}
function Cb(a) {
  var b;
  a: {
    b = 1;
    for (var c = 0;;) {
      if (b < a.length) {
        var d = b + 2, c = Ab(c, zb(a.charCodeAt(b - 1) | a.charCodeAt(b) << 16));
        b = d;
      } else {
        b = c;
        break a;
      }
    }
  }
  b = 1 === (a.length & 1) ? b ^ zb(a.charCodeAt(a.length - 1)) : b;
  return Bb(b, yb(2, a.length));
}
var Db = {}, Eb = 0;
function Fb(a) {
  255 < Eb && (Db = {}, Eb = 0);
  var b = Db[a];
  if ("number" !== typeof b) {
    a: {
      if (null != a) {
        if (b = a.length, 0 < b) {
          for (var c = 0, d = 0;;) {
            if (c < b) {
              var e = c + 1, d = yb(31, d) + a.charCodeAt(c), c = e
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
    Db[a] = b;
    Eb += 1;
  }
  return a = b;
}
function Gb(a) {
  a && (a.m & 4194304 || a.Hb) ? a = a.G(null) : "number" === typeof a ? a = Math.floor(a) % 2147483647 : !0 === a ? a = 1 : !1 === a ? a = 0 : "string" === typeof a ? (a = Fb(a), 0 !== a && (a = zb(a), a = Ab(0, a), a = Bb(a, 4))) : a = a instanceof Date ? a.valueOf() : null == a ? 0 : cb(a);
  return a;
}
function Hb(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2);
}
function Ib(a, b, c, d, e) {
  this.Qa = a;
  this.name = b;
  this.Ga = c;
  this.Ka = d;
  this.da = e;
  this.m = 2154168321;
  this.A = 4096;
}
f = Ib.prototype;
f.toString = function() {
  return this.Ga;
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.w = function(a, b) {
  return b instanceof Ib ? this.Ga === b.Ga : !1;
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
f.K = function() {
  return this.da;
};
f.R = function(a, b) {
  return new Ib(this.Qa, this.name, this.Ga, this.Ka, b);
};
f.G = function() {
  var a = this.Ka;
  return null != a ? a : this.Ka = a = Hb(Cb(this.name), Fb(this.Qa));
};
f.D = function(a, b) {
  return J(b, this.Ga);
};
function L(a) {
  if (null == a) {
    return null;
  }
  if (a && (a.m & 8388608 || a.Ib)) {
    return a.P(null);
  }
  if (xa(a) || "string" === typeof a) {
    return 0 === a.length ? null : new M(a, 0);
  }
  if (y(db, a)) {
    return eb(a);
  }
  throw Error([B(a), B(" is not ISeqable")].join(""));
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
function Jb(a) {
  return null != a ? a && (a.m & 64 || a.Va) ? a.ca(null) : (a = L(a)) ? H(a) : Kb : Kb;
}
function O(a) {
  return null == a ? null : a && (a.m & 128 || a.Ua) ? a.ba(null) : L(Jb(a));
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
  return null == a ? null == b : a === b || bb(a, b);
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
P.S = function(a) {
  var b = N(a), c = O(a);
  a = N(c);
  c = O(c);
  return P.C(b, a, c);
};
P.Y = 2;
function Lb(a) {
  this.s = a;
}
Lb.prototype.next = function() {
  if (null != this.s) {
    var a = N(this.s);
    this.s = O(this.s);
    return {value:a, done:!1};
  }
  return {value:null, done:!0};
};
function Q(a) {
  return new Lb(L(a));
}
function Mb(a, b) {
  var c = zb(a), c = Ab(0, c);
  return Bb(c, b);
}
function Nb(a) {
  var b = 0, c = 1;
  for (a = L(a);;) {
    if (null != a) {
      b += 1, c = yb(31, c) + Gb(N(a)) | 0, a = O(a);
    } else {
      return Mb(c, b);
    }
  }
}
var Ob = Mb(1, 0);
function Pb(a) {
  var b = 0, c = 0;
  for (a = L(a);;) {
    if (null != a) {
      b += 1, c = c + Gb(N(a)) | 0, a = O(a);
    } else {
      return Mb(c, b);
    }
  }
}
var Qb = Mb(0, 0);
Da["null"] = !0;
Ea["null"] = function() {
  return 0;
};
Date.prototype.w = function(a, b) {
  return b instanceof Date && this.valueOf() === b.valueOf();
};
bb.number = function(a, b) {
  return a === b;
};
Ca["function"] = !0;
Wa["function"] = !0;
Xa["function"] = function() {
  return null;
};
cb._ = function(a) {
  return a[ca] || (a[ca] = ++ea);
};
function Rb(a) {
  return Ua(a);
}
function Sb(a, b) {
  var c = Ea(a);
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
function Tb(a, b, c) {
  var d = Ea(a), e = c;
  for (c = 0;;) {
    if (c < d) {
      var g = E.h(a, c), e = b.h ? b.h(e, g) : b.call(null, e, g);
      c += 1;
    } else {
      return e;
    }
  }
}
function Ub(a, b) {
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
function Vb(a, b, c) {
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
function Xb(a, b, c, d) {
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
function Yb(a) {
  return a ? a.m & 2 || a.nb ? !0 : a.m ? !1 : y(Da, a) : y(Da, a);
}
function Zb(a, b) {
  this.c = a;
  this.i = b;
}
Zb.prototype.fb = function() {
  return this.i < this.c.length;
};
Zb.prototype.next = function() {
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
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.J = function(a, b) {
  var c = b + this.i;
  return c < this.c.length ? this.c[c] : null;
};
f.ea = function(a, b, c) {
  a = b + this.i;
  return a < this.c.length ? this.c[a] : c;
};
f.Ta = function() {
  return new Zb(this.c, this.i);
};
f.ba = function() {
  return this.i + 1 < this.c.length ? new M(this.c, this.i + 1) : null;
};
f.X = function() {
  var a = this.c.length - this.i;
  return 0 > a ? 0 : a;
};
f.G = function() {
  return Nb(this);
};
f.w = function(a, b) {
  return $b.h ? $b.h(this, b) : $b.call(null, this, b);
};
f.T = function(a, b) {
  return Xb(this.c, b, this.c[this.i], this.i + 1);
};
f.U = function(a, b, c) {
  return Xb(this.c, b, c, this.i);
};
f.V = function() {
  return this.c[this.i];
};
f.ca = function() {
  return this.i + 1 < this.c.length ? new M(this.c, this.i + 1) : Kb;
};
f.P = function() {
  return this.i < this.c.length ? this : null;
};
f.L = function(a, b) {
  return R.h ? R.h(b, this) : R.call(null, b, this);
};
M.prototype[Ba] = function() {
  return Q(this);
};
function ac(a, b) {
  return b < a.length ? new M(a, b) : null;
}
function bc() {
  switch(arguments.length) {
    case 1:
      return ac(arguments[0], 0);
    case 2:
      return ac(arguments[0], arguments[1]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
}
bb._ = function(a, b) {
  return a === b;
};
var cc = function cc() {
  switch(arguments.length) {
    case 0:
      return cc.F();
    case 1:
      return cc.j(arguments[0]);
    case 2:
      return cc.h(arguments[0], arguments[1]);
    default:
      var b = new M(Array.prototype.slice.call(arguments, 2), 0);
      return cc.C(arguments[0], arguments[1], b);
  }
};
cc.F = function() {
  return dc;
};
cc.j = function(a) {
  return a;
};
cc.h = function(a, b) {
  return null != a ? Ga(a, b) : Ga(Kb, b);
};
cc.C = function(a, b, c) {
  for (;;) {
    if (x(c)) {
      a = cc.h(a, b), b = N(c), c = O(c);
    } else {
      return cc.h(a, b);
    }
  }
};
cc.S = function(a) {
  var b = N(a), c = O(a);
  a = N(c);
  c = O(c);
  return cc.C(b, a, c);
};
cc.Y = 2;
function T(a) {
  if (null != a) {
    if (a && (a.m & 2 || a.nb)) {
      a = a.X(null);
    } else {
      if (xa(a)) {
        a = a.length;
      } else {
        if ("string" === typeof a) {
          a = a.length;
        } else {
          if (y(Da, a)) {
            a = Ea(a);
          } else {
            a: {
              a = L(a);
              for (var b = 0;;) {
                if (Yb(a)) {
                  a = b + Ea(a);
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
function ec(a, b) {
  for (var c = null;;) {
    if (null == a) {
      return c;
    }
    if (0 === b) {
      return L(a) ? N(a) : c;
    }
    var d = a;
    if (d ? d.m & 16 || d.sb || (d.m ? 0 : y(Ia, d)) : y(Ia, d)) {
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
function U(a, b) {
  if ("number" !== typeof b) {
    throw Error("index argument to nth must be a number.");
  }
  if (null == a) {
    return null;
  }
  if (a && (a.m & 16 || a.sb)) {
    return a.ea(null, b, null);
  }
  if (xa(a) || "string" === typeof a) {
    return b < a.length ? a[b] : null;
  }
  if (y(Ia, a)) {
    return E.h(a, b);
  }
  if (a ? a.m & 64 || a.Va || (a.m ? 0 : y(Ja, a)) : y(Ja, a)) {
    return ec(a, b);
  }
  throw Error([B("nth not supported on this type "), B(Aa(null == a ? null : a.constructor))].join(""));
}
function fc(a, b) {
  return null == a ? null : a && (a.m & 256 || a.tb) ? a.N(null, b) : xa(a) ? b < a.length ? a[b | 0] : null : "string" === typeof a ? b < a.length ? a[b | 0] : null : y(La, a) ? I.h(a, b) : null;
}
function gc(a, b, c) {
  return null != a ? a && (a.m & 256 || a.tb) ? a.H(null, b, c) : xa(a) ? b < a.length ? a[b] : c : "string" === typeof a ? b < a.length ? a[b] : c : y(La, a) ? I.o(a, b, c) : c : c;
}
var hc = function hc() {
  switch(arguments.length) {
    case 3:
      return hc.o(arguments[0], arguments[1], arguments[2]);
    default:
      var b = new M(Array.prototype.slice.call(arguments, 3), 0);
      return hc.C(arguments[0], arguments[1], arguments[2], b);
  }
};
hc.o = function(a, b, c) {
  if (null != a) {
    a = Ma(a, b, c);
  } else {
    a: {
      a = [b];
      c = [c];
      b = a.length;
      var d = 0, e;
      for (e = kb(ic);;) {
        if (d < b) {
          var g = d + 1;
          e = e.Oa(null, a[d], c[d]);
          d = g;
        } else {
          a = mb(e);
          break a;
        }
      }
    }
  }
  return a;
};
hc.C = function(a, b, c, d) {
  for (;;) {
    if (a = hc.o(a, b, c), x(d)) {
      b = N(d), c = N(O(d)), d = O(O(d));
    } else {
      return a;
    }
  }
};
hc.S = function(a) {
  var b = N(a), c = O(a);
  a = N(c);
  var d = O(c), c = N(d), d = O(d);
  return hc.C(b, a, c, d);
};
hc.Y = 3;
function jc(a) {
  var b = "function" == r(a);
  return x(b) ? b : a ? x(x(null) ? null : a.mb) ? !0 : a.kb ? !1 : y(Ca, a) : y(Ca, a);
}
function kc(a, b) {
  this.f = a;
  this.meta = b;
  this.m = 393217;
  this.A = 0;
}
f = kc.prototype;
f.K = function() {
  return this.meta;
};
f.R = function(a, b) {
  return new kc(this.f, b);
};
f.mb = !0;
f.call = function() {
  function a(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w, F, K, ba) {
    a = this.f;
    return lc.Sa ? lc.Sa(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w, F, K, ba) : lc.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w, F, K, ba);
  }
  function b(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w, F, K) {
    a = this;
    return a.f.wa ? a.f.wa(b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w, F, K) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w, F, K);
  }
  function c(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w, F) {
    a = this;
    return a.f.va ? a.f.va(b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w, F) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w, F);
  }
  function d(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w) {
    a = this;
    return a.f.ua ? a.f.ua(b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, w);
  }
  function e(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C) {
    a = this;
    return a.f.ta ? a.f.ta(b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C);
  }
  function g(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A) {
    a = this;
    return a.f.sa ? a.f.sa(b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A);
  }
  function h(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v) {
    a = this;
    return a.f.ra ? a.f.ra(b, c, d, e, g, h, k, l, m, n, p, q, t, u, v) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v);
  }
  function k(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u) {
    a = this;
    return a.f.qa ? a.f.qa(b, c, d, e, g, h, k, l, m, n, p, q, t, u) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, t, u);
  }
  function l(a, b, c, d, e, g, h, k, l, m, n, p, q, t) {
    a = this;
    return a.f.pa ? a.f.pa(b, c, d, e, g, h, k, l, m, n, p, q, t) : a.f.call(null, b, c, d, e, g, h, k, l, m, n, p, q, t);
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
  function t(a, b, c, d, e, g, h, k, l) {
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
  function A(a, b, c, d, e, g) {
    a = this;
    return a.f.aa ? a.f.aa(b, c, d, e, g) : a.f.call(null, b, c, d, e, g);
  }
  function C(a, b, c, d, e) {
    a = this;
    return a.f.M ? a.f.M(b, c, d, e) : a.f.call(null, b, c, d, e);
  }
  function F(a, b, c, d) {
    a = this;
    return a.f.o ? a.f.o(b, c, d) : a.f.call(null, b, c, d);
  }
  function K(a, b, c) {
    a = this;
    return a.f.h ? a.f.h(b, c) : a.f.call(null, b, c);
  }
  function ba(a, b) {
    a = this;
    return a.f.j ? a.f.j(b) : a.f.call(null, b);
  }
  function za(a) {
    a = this;
    return a.f.F ? a.f.F() : a.f.call(null);
  }
  var w = null, w = function(w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na, Va, hb, wb, Wb, wc, Uc, Ld, ve) {
    switch(arguments.length) {
      case 1:
        return za.call(this, w);
      case 2:
        return ba.call(this, w, S);
      case 3:
        return K.call(this, w, S, W);
      case 4:
        return F.call(this, w, S, W, X);
      case 5:
        return C.call(this, w, S, W, X, aa);
      case 6:
        return A.call(this, w, S, W, X, aa, da);
      case 7:
        return v.call(this, w, S, W, X, aa, da, ja);
      case 8:
        return u.call(this, w, S, W, X, aa, da, ja, ka);
      case 9:
        return t.call(this, w, S, W, X, aa, da, ja, ka, ma);
      case 10:
        return q.call(this, w, S, W, X, aa, da, ja, ka, ma, pa);
      case 11:
        return p.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa);
      case 12:
        return n.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya);
      case 13:
        return m.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha);
      case 14:
        return l.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na);
      case 15:
        return k.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na, Va);
      case 16:
        return h.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na, Va, hb);
      case 17:
        return g.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na, Va, hb, wb);
      case 18:
        return e.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na, Va, hb, wb, Wb);
      case 19:
        return d.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na, Va, hb, wb, Wb, wc);
      case 20:
        return c.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na, Va, hb, wb, Wb, wc, Uc);
      case 21:
        return b.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na, Va, hb, wb, Wb, wc, Uc, Ld);
      case 22:
        return a.call(this, w, S, W, X, aa, da, ja, ka, ma, pa, sa, ya, Ha, Na, Va, hb, wb, Wb, wc, Uc, Ld, ve);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  w.j = za;
  w.h = ba;
  w.o = K;
  w.M = F;
  w.aa = C;
  w.xa = A;
  w.ya = v;
  w.za = u;
  w.Aa = t;
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
  w.rb = b;
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
f.M = function(a, b, c, d) {
  return this.f.M ? this.f.M(a, b, c, d) : this.f.call(null, a, b, c, d);
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
f.qa = function(a, b, c, d, e, g, h, k, l, m, n, p, q, t) {
  return this.f.qa ? this.f.qa(a, b, c, d, e, g, h, k, l, m, n, p, q, t) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, t);
};
f.ra = function(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u) {
  return this.f.ra ? this.f.ra(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, t, u);
};
f.sa = function(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v) {
  return this.f.sa ? this.f.sa(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v);
};
f.ta = function(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A) {
  return this.f.ta ? this.f.ta(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A);
};
f.ua = function(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C) {
  return this.f.ua ? this.f.ua(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C);
};
f.va = function(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F) {
  return this.f.va ? this.f.va(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F);
};
f.wa = function(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K) {
  return this.f.wa ? this.f.wa(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K) : this.f.call(null, a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K);
};
f.rb = function(a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K, ba) {
  var za = this.f;
  return lc.Sa ? lc.Sa(za, a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K, ba) : lc.call(null, za, a, b, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K, ba);
};
function mc(a) {
  var b = null != a;
  return (b ? a ? a.m & 131072 || a.wb || (a.m ? 0 : y(Wa, a)) : y(Wa, a) : b) ? Xa(a) : null;
}
function nc(a) {
  return null == a ? !1 : a ? a.m & 1024 || a.ub ? !0 : a.m ? !1 : y(Oa, a) : y(Oa, a);
}
function oc(a) {
  return a ? a.m & 16384 || a.Kb ? !0 : a.m ? !1 : y(Sa, a) : y(Sa, a);
}
function pc(a) {
  return a ? a.A & 512 || a.Eb ? !0 : !1 : !1;
}
function qc(a) {
  var b = [];
  ga(a, function(a, b) {
    return function(a, c) {
      return b.push(c);
    };
  }(a, b));
  return b;
}
function rc(a, b, c, d, e) {
  for (;0 !== e;) {
    c[d] = a[b], d += 1, --e, b += 1;
  }
}
var sc = {};
function tc(a) {
  return x(a) ? !0 : !1;
}
function uc(a, b) {
  var c = L(b);
  if (c) {
    var d = N(c), c = O(c);
    return vc ? vc(a, d, c) : xc.call(null, a, d, c);
  }
  return a.F ? a.F() : a.call(null);
}
function yc(a, b, c) {
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
function xc() {
  switch(arguments.length) {
    case 2:
      var a = arguments[0], b = arguments[1];
      return b && (b.m & 524288 || b.yb) ? b.T(null, a) : xa(b) ? Ub(b, a) : "string" === typeof b ? Ub(b, a) : y($a, b) ? ab.h(b, a) : uc(a, b);
    case 3:
      return vc(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
}
function vc(a, b, c) {
  return c && (c.m & 524288 || c.yb) ? c.U(null, a, b) : xa(c) ? Vb(c, a, b) : "string" === typeof c ? Vb(c, a, b) : y($a, c) ? ab.o(c, a, b) : yc(a, b, c);
}
function zc(a) {
  return a;
}
function Ac(a) {
  a = (a - a % 2) / 2;
  return 0 <= a ? Math.floor(a) : Math.ceil(a);
}
function Bc(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24;
}
var B = function B() {
  switch(arguments.length) {
    case 0:
      return B.F();
    case 1:
      return B.j(arguments[0]);
    default:
      var b = new M(Array.prototype.slice.call(arguments, 1), 0);
      return B.C(arguments[0], b);
  }
};
B.F = function() {
  return "";
};
B.j = function(a) {
  return null == a ? "" : fa(a);
};
B.C = function(a, b) {
  for (var c = new ha("" + B(a)), d = b;;) {
    if (x(d)) {
      c = c.append("" + B(N(d))), d = O(d);
    } else {
      return c.toString();
    }
  }
};
B.S = function(a) {
  var b = N(a);
  a = O(a);
  return B.C(b, a);
};
B.Y = 1;
function $b(a, b) {
  var c;
  if (b ? b.m & 16777216 || b.Jb || (b.m ? 0 : y(fb, b)) : y(fb, b)) {
    if (Yb(a) && Yb(b) && T(a) !== T(b)) {
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
  return tc(c);
}
function Cc(a, b, c, d, e) {
  this.meta = a;
  this.first = b;
  this.Ba = c;
  this.count = d;
  this.v = e;
  this.m = 65937646;
  this.A = 8192;
}
f = Cc.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
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
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.V = function() {
  return this.first;
};
f.ca = function() {
  return 1 === this.count ? Kb : this.Ba;
};
f.P = function() {
  return this;
};
f.R = function(a, b) {
  return new Cc(b, this.first, this.Ba, this.count, this.v);
};
f.L = function(a, b) {
  return new Cc(this.meta, b, this, this.count + 1, null);
};
Cc.prototype[Ba] = function() {
  return Q(this);
};
function Dc(a) {
  this.meta = a;
  this.m = 65937614;
  this.A = 8192;
}
f = Dc.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
  return this.meta;
};
f.ba = function() {
  return null;
};
f.X = function() {
  return 0;
};
f.G = function() {
  return Ob;
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.V = function() {
  return null;
};
f.ca = function() {
  return Kb;
};
f.P = function() {
  return null;
};
f.R = function(a, b) {
  return new Dc(b);
};
f.L = function(a, b) {
  return new Cc(this.meta, b, null, 1, null);
};
var Kb = new Dc(null);
Dc.prototype[Ba] = function() {
  return Q(this);
};
function Ec() {
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
    for (var a = b.length, c = Kb;;) {
      if (0 < a) {
        var d = a - 1, c = c.L(null, b[a - 1]), a = d
      } else {
        break a;
      }
    }
  }
  return c;
}
function Fc(a, b, c, d) {
  this.meta = a;
  this.first = b;
  this.Ba = c;
  this.v = d;
  this.m = 65929452;
  this.A = 8192;
}
f = Fc.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
  return this.meta;
};
f.ba = function() {
  return null == this.Ba ? null : L(this.Ba);
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.V = function() {
  return this.first;
};
f.ca = function() {
  return null == this.Ba ? Kb : this.Ba;
};
f.P = function() {
  return this;
};
f.R = function(a, b) {
  return new Fc(b, this.first, this.Ba, this.v);
};
f.L = function(a, b) {
  return new Fc(null, b, this, this.v);
};
Fc.prototype[Ba] = function() {
  return Q(this);
};
function R(a, b) {
  var c = null == b;
  return (c ? c : b && (b.m & 64 || b.Va)) ? new Fc(null, a, b, null) : new Fc(null, a, L(b), null);
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
  return [B(":"), B(this.Ea)].join("");
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
        return fc(c, this);
      case 3:
        return gc(c, this, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return fc(c, this);
  };
  a.o = function(a, c, d) {
    return gc(c, this, d);
  };
  return a;
}();
f.apply = function(a, b) {
  return this.call.apply(this, [this].concat(D(b)));
};
f.j = function(a) {
  return fc(a, this);
};
f.h = function(a, b) {
  return gc(a, this, b);
};
f.G = function() {
  var a = this.Ka;
  return null != a ? a : this.Ka = a = Hb(Cb(this.name), Fb(this.Qa)) + 2654435769 | 0;
};
f.D = function(a, b) {
  return J(b, [B(":"), B(this.Ea)].join(""));
};
var Gc = function Gc() {
  switch(arguments.length) {
    case 1:
      return Gc.j(arguments[0]);
    case 2:
      return Gc.h(arguments[0], arguments[1]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
};
Gc.j = function(a) {
  if (a instanceof V) {
    return a;
  }
  if (a instanceof Ib) {
    var b;
    if (a && (a.A & 4096 || a.xb)) {
      b = a.Qa;
    } else {
      throw Error([B("Doesn't support namespace: "), B(a)].join(""));
    }
    return new V(b, Hc.j ? Hc.j(a) : Hc.call(null, a), a.Ga, null);
  }
  return "string" === typeof a ? (b = a.split("/"), 2 === b.length ? new V(b[0], b[1], a, null) : new V(null, b[0], a, null)) : null;
};
Gc.h = function(a, b) {
  return new V(a, b, [B(x(a) ? [B(a), B("/")].join("") : null), B(b)].join(""), null);
};
Gc.Y = 2;
function Ic(a, b, c, d) {
  this.meta = a;
  this.fn = b;
  this.s = c;
  this.v = d;
  this.m = 32374988;
  this.A = 0;
}
f = Ic.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
function Jc(a) {
  null != a.fn && (a.s = a.fn.F ? a.fn.F() : a.fn.call(null), a.fn = null);
  return a.s;
}
f.K = function() {
  return this.meta;
};
f.ba = function() {
  eb(this);
  return null == this.s ? null : O(this.s);
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.V = function() {
  eb(this);
  return null == this.s ? null : N(this.s);
};
f.ca = function() {
  eb(this);
  return null != this.s ? Jb(this.s) : Kb;
};
f.P = function() {
  Jc(this);
  if (null == this.s) {
    return null;
  }
  for (var a = this.s;;) {
    if (a instanceof Ic) {
      a = Jc(a);
    } else {
      return this.s = a, L(this.s);
    }
  }
};
f.R = function(a, b) {
  return new Ic(b, this.fn, this.s, this.v);
};
f.L = function(a, b) {
  return R(b, this);
};
Ic.prototype[Ba] = function() {
  return Q(this);
};
function Kc(a, b) {
  this.Ya = a;
  this.end = b;
  this.m = 2;
  this.A = 0;
}
Kc.prototype.add = function(a) {
  this.Ya[this.end] = a;
  return this.end += 1;
};
Kc.prototype.la = function() {
  var a = new Lc(this.Ya, 0, this.end);
  this.Ya = null;
  return a;
};
Kc.prototype.X = function() {
  return this.end;
};
function Lc(a, b, c) {
  this.c = a;
  this.off = b;
  this.end = c;
  this.m = 524306;
  this.A = 0;
}
f = Lc.prototype;
f.X = function() {
  return this.end - this.off;
};
f.J = function(a, b) {
  return this.c[this.off + b];
};
f.ea = function(a, b, c) {
  return 0 <= b && b < this.end - this.off ? this.c[this.off + b] : c;
};
f.gb = function() {
  if (this.off === this.end) {
    throw Error("-drop-first of empty chunk");
  }
  return new Lc(this.c, this.off + 1, this.end);
};
f.T = function(a, b) {
  return Xb(this.c, b, this.c[this.off], this.off + 1);
};
f.U = function(a, b, c) {
  return Xb(this.c, b, c, this.off);
};
function Mc(a, b, c, d) {
  this.la = a;
  this.ka = b;
  this.meta = c;
  this.v = d;
  this.m = 31850732;
  this.A = 1536;
}
f = Mc.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
  return this.meta;
};
f.ba = function() {
  if (1 < Ea(this.la)) {
    return new Mc(pb(this.la), this.ka, this.meta, null);
  }
  var a = eb(this.ka);
  return null == a ? null : a;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.V = function() {
  return E.h(this.la, 0);
};
f.ca = function() {
  return 1 < Ea(this.la) ? new Mc(pb(this.la), this.ka, this.meta, null) : null == this.ka ? Kb : this.ka;
};
f.P = function() {
  return this;
};
f.$a = function() {
  return this.la;
};
f.ab = function() {
  return null == this.ka ? Kb : this.ka;
};
f.R = function(a, b) {
  return new Mc(this.la, this.ka, b, this.v);
};
f.L = function(a, b) {
  return R(b, this);
};
f.Za = function() {
  return null == this.ka ? null : this.ka;
};
Mc.prototype[Ba] = function() {
  return Q(this);
};
function Nc(a, b) {
  return 0 === Ea(a) ? b : new Mc(a, b, null, null);
}
function Oc(a, b) {
  a.add(b);
}
function Pc(a) {
  for (var b = [];;) {
    if (L(a)) {
      b.push(N(a)), a = O(a);
    } else {
      return b;
    }
  }
}
function Qc(a, b) {
  if (Yb(a)) {
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
var Rc = function Rc(b) {
  return null == b ? null : null == O(b) ? L(N(b)) : R(N(b), Rc(O(b)));
};
function Sc(a, b, c) {
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
    return a.M ? a.M(c, d, e, g) : a.M ? a.M(c, d, e, g) : a.call(null, c, d, e, g);
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
  var p = G(q), t = H(q);
  if (10 === b) {
    return a.ma ? a.ma(c, d, e, g, h, k, l, m, n, p) : a.ma ? a.ma(c, d, e, g, h, k, l, m, n, p) : a.call(null, c, d, e, g, h, k, l, m, n, p);
  }
  var q = G(t), u = H(t);
  if (11 === b) {
    return a.na ? a.na(c, d, e, g, h, k, l, m, n, p, q) : a.na ? a.na(c, d, e, g, h, k, l, m, n, p, q) : a.call(null, c, d, e, g, h, k, l, m, n, p, q);
  }
  var t = G(u), v = H(u);
  if (12 === b) {
    return a.oa ? a.oa(c, d, e, g, h, k, l, m, n, p, q, t) : a.oa ? a.oa(c, d, e, g, h, k, l, m, n, p, q, t) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, t);
  }
  var u = G(v), A = H(v);
  if (13 === b) {
    return a.pa ? a.pa(c, d, e, g, h, k, l, m, n, p, q, t, u) : a.pa ? a.pa(c, d, e, g, h, k, l, m, n, p, q, t, u) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, t, u);
  }
  var v = G(A), C = H(A);
  if (14 === b) {
    return a.qa ? a.qa(c, d, e, g, h, k, l, m, n, p, q, t, u, v) : a.qa ? a.qa(c, d, e, g, h, k, l, m, n, p, q, t, u, v) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, t, u, v);
  }
  var A = G(C), F = H(C);
  if (15 === b) {
    return a.ra ? a.ra(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A) : a.ra ? a.ra(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A);
  }
  var C = G(F), K = H(F);
  if (16 === b) {
    return a.sa ? a.sa(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C) : a.sa ? a.sa(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C);
  }
  var F = G(K), ba = H(K);
  if (17 === b) {
    return a.ta ? a.ta(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F) : a.ta ? a.ta(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F);
  }
  var K = G(ba), za = H(ba);
  if (18 === b) {
    return a.ua ? a.ua(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K) : a.ua ? a.ua(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K);
  }
  ba = G(za);
  za = H(za);
  if (19 === b) {
    return a.va ? a.va(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K, ba) : a.va ? a.va(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K, ba) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K, ba);
  }
  var w = G(za);
  H(za);
  if (20 === b) {
    return a.wa ? a.wa(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K, ba, w) : a.wa ? a.wa(c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K, ba, w) : a.call(null, c, d, e, g, h, k, l, m, n, p, q, t, u, v, A, C, F, K, ba, w);
  }
  throw Error("Only up to 20 arguments supported on functions");
}
function lc() {
  switch(arguments.length) {
    case 2:
      return Tc(arguments[0], arguments[1]);
    case 3:
      return Vc(arguments[0], arguments[1], arguments[2]);
    case 4:
      var a;
      a = arguments[0];
      var b = R(arguments[1], R(arguments[2], arguments[3])), c = a.Y;
      if (a.S) {
        var d = Qc(b, c + 1);
        a = d <= c ? Sc(a, d, b) : a.S(b);
      } else {
        a = a.apply(a, Pc(b));
      }
      return a;
    case 5:
      return a = arguments[0], b = R(arguments[1], R(arguments[2], R(arguments[3], arguments[4]))), c = a.Y, a.S ? (d = Qc(b, c + 1), a = d <= c ? Sc(a, d, b) : a.S(b)) : a = a.apply(a, Pc(b)), a;
    default:
      return b = new M(Array.prototype.slice.call(arguments, 5), 0), a = arguments[0], b = R(arguments[1], R(arguments[2], R(arguments[3], R(arguments[4], Rc(b))))), c = a.Y, a.S ? (d = Qc(b, c + 1), a = d <= c ? Sc(a, d, b) : a.S(b)) : a = a.apply(a, Pc(b)), a;
  }
}
function Tc(a, b) {
  var c = a.Y;
  if (a.S) {
    var d = Qc(b, c + 1);
    return d <= c ? Sc(a, d, b) : a.S(b);
  }
  return a.apply(a, Pc(b));
}
function Vc(a, b, c) {
  b = R(b, c);
  c = a.Y;
  if (a.S) {
    var d = Qc(b, c + 1);
    return d <= c ? Sc(a, d, b) : a.S(b);
  }
  return a.apply(a, Pc(b));
}
function Wc(a, b) {
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
function Xc(a, b, c, d) {
  this.state = a;
  this.meta = b;
  this.Db = c;
  this.lb = d;
  this.A = 16386;
  this.m = 6455296;
}
f = Xc.prototype;
f.equiv = function(a) {
  return this.w(null, a);
};
f.w = function(a, b) {
  return this === b;
};
f.ob = function() {
  return this.state;
};
f.K = function() {
  return this.meta;
};
f.ib = function(a, b, c) {
  for (var d = L(this.lb), e = null, g = 0, h = 0;;) {
    if (h < g) {
      a = e.J(null, h);
      var k = U(a, 0);
      a = U(a, 1);
      var l = b, m = c;
      a.M ? a.M(k, this, l, m) : a.call(null, k, this, l, m);
      h += 1;
    } else {
      if (a = L(d)) {
        d = a, pc(d) ? (e = qb(d), d = rb(d), a = e, g = T(e), e = a) : (a = N(d), k = U(a, 0), a = U(a, 1), e = k, g = b, h = c, a.M ? a.M(e, this, g, h) : a.call(null, e, this, g, h), d = O(d), e = null, g = 0), h = 0;
      } else {
        return null;
      }
    }
  }
};
f.G = function() {
  return this[ca] || (this[ca] = ++ea);
};
function Yc() {
  switch(arguments.length) {
    case 1:
      return Zc(arguments[0]);
    default:
      var a = new M(Array.prototype.slice.call(arguments, 1), 0), b = arguments[0], c = a, c = (null == c ? 0 : c ? c.m & 64 || c.Va || (c.m ? 0 : y(Ja, c)) : y(Ja, c)) ? Tc($c, a) : a, a = fc(c, ua), c = fc(c, ad);
      return new Xc(b, a, c, null);
  }
}
function Zc(a) {
  return new Xc(a, null, null, null);
}
function bd(a, b) {
  if (a instanceof Xc) {
    var c = a.Db;
    if (null != c && !x(c.j ? c.j(b) : c.call(null, b))) {
      throw Error([B("Assert failed: "), B("Validator rejected reference state"), B("\n"), B(function() {
        var a = Ec(new Ib(null, "validate", "validate", 1439230700, null), new Ib(null, "new-value", "new-value", -1567397401, null));
        return cd.j ? cd.j(a) : cd.call(null, a);
      }())].join(""));
    }
    c = a.state;
    a.state = b;
    null != a.lb && jb(a, c, b);
    return b;
  }
  return tb(a, b);
}
var Y = function Y() {
  switch(arguments.length) {
    case 1:
      return Y.j(arguments[0]);
    case 2:
      return Y.h(arguments[0], arguments[1]);
    case 3:
      return Y.o(arguments[0], arguments[1], arguments[2]);
    case 4:
      return Y.M(arguments[0], arguments[1], arguments[2], arguments[3]);
    default:
      var b = new M(Array.prototype.slice.call(arguments, 4), 0);
      return Y.C(arguments[0], arguments[1], arguments[2], arguments[3], b);
  }
};
Y.j = function(a) {
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
          e = Vc(a, e, g);
          return b.h ? b.h(c, e) : b.call(null, c, e);
        }
        c.Y = 2;
        c.S = function(a) {
          var b = N(a);
          a = O(a);
          var c = N(a);
          a = Jb(a);
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
      g.S = h.S;
      g.F = e;
      g.j = d;
      g.h = c;
      g.C = h.C;
      return g;
    }();
  };
};
Y.h = function(a, b) {
  return new Ic(null, function() {
    var c = L(b);
    if (c) {
      if (pc(c)) {
        for (var d = qb(c), e = T(d), g = new Kc(Array(e), 0), h = 0;;) {
          if (h < e) {
            Oc(g, function() {
              var b = E.h(d, h);
              return a.j ? a.j(b) : a.call(null, b);
            }()), h += 1;
          } else {
            break;
          }
        }
        return Nc(g.la(), Y.h(a, rb(c)));
      }
      return R(function() {
        var b = N(c);
        return a.j ? a.j(b) : a.call(null, b);
      }(), Y.h(a, Jb(c)));
    }
    return null;
  }, null, null);
};
Y.o = function(a, b, c) {
  return new Ic(null, function() {
    var d = L(b), e = L(c);
    if (d && e) {
      var g = R, h;
      h = N(d);
      var k = N(e);
      h = a.h ? a.h(h, k) : a.call(null, h, k);
      d = g(h, Y.o(a, Jb(d), Jb(e)));
    } else {
      d = null;
    }
    return d;
  }, null, null);
};
Y.M = function(a, b, c, d) {
  return new Ic(null, function() {
    var e = L(b), g = L(c), h = L(d);
    if (e && g && h) {
      var k = R, l;
      l = N(e);
      var m = N(g), n = N(h);
      l = a.o ? a.o(l, m, n) : a.call(null, l, m, n);
      e = k(l, Y.M(a, Jb(e), Jb(g), Jb(h)));
    } else {
      e = null;
    }
    return e;
  }, null, null);
};
Y.C = function(a, b, c, d, e) {
  var g = function k(a) {
    return new Ic(null, function() {
      var b = Y.h(L, a);
      return Wc(zc, b) ? R(Y.h(N, b), k(Y.h(Jb, b))) : null;
    }, null, null);
  };
  return Y.h(function() {
    return function(b) {
      return Tc(a, b);
    };
  }(g), g(cc.C(e, d, bc([c, b], 0))));
};
Y.S = function(a) {
  var b = N(a), c = O(a);
  a = N(c);
  var d = O(c), c = N(d), e = O(d), d = N(e), e = O(e);
  return Y.C(b, a, c, d, e);
};
Y.Y = 4;
function dd(a, b) {
  this.B = a;
  this.c = b;
}
function ed(a) {
  return new dd(a, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
}
function fd(a) {
  a = a.l;
  return 32 > a ? 0 : a - 1 >>> 5 << 5;
}
function gd(a, b, c) {
  for (;;) {
    if (0 === b) {
      return c;
    }
    var d = ed(a);
    d.c[0] = c;
    c = d;
    b -= 5;
  }
}
var hd = function hd(b, c, d, e) {
  var g = new dd(d.B, D(d.c)), h = b.l - 1 >>> c & 31;
  5 === c ? g.c[h] = e : (d = d.c[h], b = null != d ? hd(b, c - 5, d, e) : gd(null, c - 5, e), g.c[h] = b);
  return g;
};
function id(a, b) {
  throw Error([B("No item "), B(a), B(" in vector of length "), B(b)].join(""));
}
function jd(a, b) {
  if (b >= fd(a)) {
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
function kd(a, b) {
  return 0 <= b && b < a.l ? jd(a, b) : id(b, a.l);
}
var ld = function ld(b, c, d, e, g) {
  var h = new dd(d.B, D(d.c));
  if (0 === c) {
    h.c[e & 31] = g;
  } else {
    var k = e >>> c & 31;
    b = ld(b, c - 5, d.c[k], e, g);
    h.c[k] = b;
  }
  return h;
};
function md(a, b, c, d, e, g) {
  this.i = a;
  this.base = b;
  this.c = c;
  this.Ca = d;
  this.start = e;
  this.end = g;
}
md.prototype.fb = function() {
  return this.i < this.end;
};
md.prototype.next = function() {
  32 === this.i - this.base && (this.c = jd(this.Ca, this.i), this.base += 32);
  var a = this.c[this.i & 31];
  this.i += 1;
  return a;
};
function nd(a, b, c, d, e, g) {
  this.meta = a;
  this.l = b;
  this.shift = c;
  this.root = d;
  this.Z = e;
  this.v = g;
  this.m = 167668511;
  this.A = 8196;
}
f = nd.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.N = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  return "number" === typeof b ? E.o(this, b, c) : c;
};
f.J = function(a, b) {
  return kd(this, b)[b & 31];
};
f.ea = function(a, b, c) {
  return 0 <= b && b < this.l ? jd(this, b)[b & 31] : c;
};
f.eb = function(a, b, c) {
  if (0 <= b && b < this.l) {
    return fd(this) <= b ? (a = D(this.Z), a[b & 31] = c, new nd(this.meta, this.l, this.shift, this.root, a, null)) : new nd(this.meta, this.l, this.shift, ld(this, this.shift, this.root, b, c), this.Z, null);
  }
  if (b === this.l) {
    return Ga(this, c);
  }
  throw Error([B("Index "), B(b), B(" out of bounds  [0,"), B(this.l), B("]")].join(""));
};
f.Ta = function() {
  var a = this.l;
  return new md(0, 0, 0 < T(this) ? jd(this, 0) : null, this, 0, a);
};
f.K = function() {
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
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  if (b instanceof nd) {
    if (this.l === T(b)) {
      for (var c = ub(this), d = ub(b);;) {
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
    return $b(this, b);
  }
};
f.Ra = function() {
  var a = this;
  return new od(a.l, a.shift, function() {
    var b = a.root;
    return pd.j ? pd.j(b) : pd.call(null, b);
  }(), function() {
    var b = a.Z;
    return qd.j ? qd.j(b) : qd.call(null, b);
  }());
};
f.T = function(a, b) {
  return Sb(this, b);
};
f.U = function(a, b, c) {
  a = 0;
  for (var d = c;;) {
    if (a < this.l) {
      var e = jd(this, a);
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
    return Ta(this, b, c);
  }
  throw Error("Vector's key for assoc must be a number.");
};
f.P = function() {
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
  return rd ? rd(this, a, 0, 0) : sd.call(null, this, a, 0, 0);
};
f.R = function(a, b) {
  return new nd(b, this.l, this.shift, this.root, this.Z, this.v);
};
f.L = function(a, b) {
  if (32 > this.l - fd(this)) {
    for (var c = this.Z.length, d = Array(c + 1), e = 0;;) {
      if (e < c) {
        d[e] = this.Z[e], e += 1;
      } else {
        break;
      }
    }
    d[c] = b;
    return new nd(this.meta, this.l + 1, this.shift, this.root, d, null);
  }
  c = (d = this.l >>> 5 > 1 << this.shift) ? this.shift + 5 : this.shift;
  d ? (d = ed(null), d.c[0] = this.root, e = gd(null, this.shift, new dd(null, this.Z)), d.c[1] = e) : d = hd(this, this.shift, this.root, new dd(null, this.Z));
  return new nd(this.meta, this.l + 1, c, d, [b], null);
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.J(null, c);
      case 3:
        return this.ea(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.J(null, c);
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
  return this.J(null, a);
};
f.h = function(a, b) {
  return this.ea(null, a, b);
};
var td = new dd(null, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]), dc = new nd(null, 0, 5, td, [], Ob);
nd.prototype[Ba] = function() {
  return Q(this);
};
function ud(a, b, c, d, e, g) {
  this.ga = a;
  this.node = b;
  this.i = c;
  this.off = d;
  this.meta = e;
  this.v = g;
  this.m = 32375020;
  this.A = 1536;
}
f = ud.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
  return this.meta;
};
f.ba = function() {
  if (this.off + 1 < this.node.length) {
    var a;
    a = this.ga;
    var b = this.node, c = this.i, d = this.off + 1;
    a = rd ? rd(a, b, c, d) : sd.call(null, a, b, c, d);
    return null == a ? null : a;
  }
  return sb(this);
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  var c;
  c = this.ga;
  var d = this.i + this.off, e = T(this.ga);
  c = vd ? vd(c, d, e) : wd.call(null, c, d, e);
  return Sb(c, b);
};
f.U = function(a, b, c) {
  a = this.ga;
  var d = this.i + this.off, e = T(this.ga);
  a = vd ? vd(a, d, e) : wd.call(null, a, d, e);
  return Tb(a, b, c);
};
f.V = function() {
  return this.node[this.off];
};
f.ca = function() {
  if (this.off + 1 < this.node.length) {
    var a;
    a = this.ga;
    var b = this.node, c = this.i, d = this.off + 1;
    a = rd ? rd(a, b, c, d) : sd.call(null, a, b, c, d);
    return null == a ? Kb : a;
  }
  return rb(this);
};
f.P = function() {
  return this;
};
f.$a = function() {
  var a = this.node;
  return new Lc(a, this.off, a.length);
};
f.ab = function() {
  var a = this.i + this.node.length;
  if (a < Ea(this.ga)) {
    var b = this.ga, c = jd(this.ga, a);
    return rd ? rd(b, c, a, 0) : sd.call(null, b, c, a, 0);
  }
  return Kb;
};
f.R = function(a, b) {
  var c = this.ga, d = this.node, e = this.i, g = this.off;
  return xd ? xd(c, d, e, g, b) : sd.call(null, c, d, e, g, b);
};
f.L = function(a, b) {
  return R(b, this);
};
f.Za = function() {
  var a = this.i + this.node.length;
  if (a < Ea(this.ga)) {
    var b = this.ga, c = jd(this.ga, a);
    return rd ? rd(b, c, a, 0) : sd.call(null, b, c, a, 0);
  }
  return null;
};
ud.prototype[Ba] = function() {
  return Q(this);
};
function sd() {
  switch(arguments.length) {
    case 3:
      var a = arguments[0], b = arguments[1], c = arguments[2];
      return new ud(a, kd(a, b), b, c, null, null);
    case 4:
      return rd(arguments[0], arguments[1], arguments[2], arguments[3]);
    case 5:
      return xd(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
}
function rd(a, b, c, d) {
  return new ud(a, b, c, d, null, null);
}
function xd(a, b, c, d, e) {
  return new ud(a, b, c, d, e, null);
}
function yd(a, b, c, d, e) {
  this.meta = a;
  this.Ca = b;
  this.start = c;
  this.end = d;
  this.v = e;
  this.m = 167666463;
  this.A = 8192;
}
f = yd.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.N = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  return "number" === typeof b ? E.o(this, b, c) : c;
};
f.J = function(a, b) {
  return 0 > b || this.end <= this.start + b ? id(b, this.end - this.start) : E.h(this.Ca, this.start + b);
};
f.ea = function(a, b, c) {
  return 0 > b || this.end <= this.start + b ? c : E.o(this.Ca, this.start + b, c);
};
f.eb = function(a, b, c) {
  var d = this.start + b;
  a = this.meta;
  c = hc.o(this.Ca, d, c);
  b = this.start;
  var e = this.end, d = d + 1, d = e > d ? e : d;
  return zd.aa ? zd.aa(a, c, b, d, null) : zd.call(null, a, c, b, d, null);
};
f.K = function() {
  return this.meta;
};
f.X = function() {
  return this.end - this.start;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return Sb(this, b);
};
f.U = function(a, b, c) {
  return Tb(this, b, c);
};
f.Na = function(a, b, c) {
  if ("number" === typeof b) {
    return Ta(this, b, c);
  }
  throw Error("Subvec's key for assoc must be a number.");
};
f.P = function() {
  var a = this;
  return function(b) {
    return function d(e) {
      return e === a.end ? null : R(E.h(a.Ca, e), new Ic(null, function() {
        return function() {
          return d(e + 1);
        };
      }(b), null, null));
    };
  }(this)(a.start);
};
f.R = function(a, b) {
  var c = this.Ca, d = this.start, e = this.end, g = this.v;
  return zd.aa ? zd.aa(b, c, d, e, g) : zd.call(null, b, c, d, e, g);
};
f.L = function(a, b) {
  var c = this.meta, d = Ta(this.Ca, this.end, b), e = this.start, g = this.end + 1;
  return zd.aa ? zd.aa(c, d, e, g, null) : zd.call(null, c, d, e, g, null);
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.J(null, c);
      case 3:
        return this.ea(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.J(null, c);
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
  return this.J(null, a);
};
f.h = function(a, b) {
  return this.ea(null, a, b);
};
yd.prototype[Ba] = function() {
  return Q(this);
};
function zd(a, b, c, d, e) {
  for (;;) {
    if (b instanceof yd) {
      c = b.start + c, d = b.start + d, b = b.Ca;
    } else {
      var g = T(b);
      if (0 > c || 0 > d || c > g || d > g) {
        throw Error("Index out of bounds");
      }
      return new yd(a, b, c, d, e);
    }
  }
}
function wd() {
  switch(arguments.length) {
    case 2:
      var a = arguments[0];
      return vd(a, arguments[1], T(a));
    case 3:
      return vd(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
}
function vd(a, b, c) {
  return zd(null, a, b, c, null);
}
function Ad(a, b) {
  return a === b.B ? b : new dd(a, D(b.c));
}
function pd(a) {
  return new dd({}, D(a.c));
}
function qd(a) {
  var b = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  rc(a, 0, b, 0, a.length);
  return b;
}
var Bd = function Bd(b, c, d, e) {
  d = Ad(b.root.B, d);
  var g = b.l - 1 >>> c & 31;
  if (5 === c) {
    b = e;
  } else {
    var h = d.c[g];
    b = null != h ? Bd(b, c - 5, h, e) : gd(b.root.B, c - 5, e);
  }
  d.c[g] = b;
  return d;
};
function od(a, b, c, d) {
  this.l = a;
  this.shift = b;
  this.root = c;
  this.Z = d;
  this.A = 88;
  this.m = 275;
}
f = od.prototype;
f.Wa = function(a, b) {
  if (this.root.B) {
    if (32 > this.l - fd(this)) {
      this.Z[this.l & 31] = b;
    } else {
      var c = new dd(this.root.B, this.Z), d = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      d[0] = b;
      this.Z = d;
      if (this.l >>> 5 > 1 << this.shift) {
        var d = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], e = this.shift + 5;
        d[0] = this.root;
        d[1] = gd(this.root.B, this.shift, c);
        this.root = new dd(this.root.B, d);
        this.shift = e;
      } else {
        this.root = Bd(this, this.shift, this.root, c);
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
    var a = this.l - fd(this), b = Array(a);
    rc(this.Z, 0, b, 0, a);
    return new nd(null, this.l, this.shift, this.root, b, null);
  }
  throw Error("persistent! called twice");
};
f.Oa = function(a, b, c) {
  if ("number" === typeof b) {
    return ob(this, b, c);
  }
  throw Error("TransientVector's key for assoc! must be a number.");
};
f.hb = function(a, b, c) {
  var d = this;
  if (d.root.B) {
    if (0 <= b && b < d.l) {
      return fd(this) <= b ? d.Z[b & 31] = c : (a = function() {
        return function g(a, k) {
          var l = Ad(d.root.B, k);
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
      return lb(this, c);
    }
    throw Error([B("Index "), B(b), B(" out of bounds for TransientVector of length"), B(d.l)].join(""));
  }
  throw Error("assoc! after persistent!");
};
f.X = function() {
  if (this.root.B) {
    return this.l;
  }
  throw Error("count after persistent!");
};
f.J = function(a, b) {
  if (this.root.B) {
    return kd(this, b)[b & 31];
  }
  throw Error("nth after persistent!");
};
f.ea = function(a, b, c) {
  return 0 <= b && b < this.l ? E.h(this, b) : c;
};
f.N = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  return "number" === typeof b ? E.o(this, b, c) : c;
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.N(null, c);
      case 3:
        return this.H(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.N(null, c);
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
  return this.N(null, a);
};
f.h = function(a, b) {
  return this.H(null, a, b);
};
function Cd() {
  this.m = 2097152;
  this.A = 0;
}
Cd.prototype.equiv = function(a) {
  return this.w(null, a);
};
Cd.prototype.w = function() {
  return !1;
};
var Dd = new Cd;
function Ed(a, b) {
  return tc(nc(b) ? T(a) === T(b) ? Wc(zc, Y.h(function(a) {
    return P.h(gc(b, N(a), Dd), N(O(a)));
  }, a)) : null : null);
}
function Fd(a) {
  this.s = a;
}
Fd.prototype.next = function() {
  if (null != this.s) {
    var a = N(this.s), b = U(a, 0), a = U(a, 1);
    this.s = O(this.s);
    return {value:[b, a], done:!1};
  }
  return {value:null, done:!0};
};
function Gd(a) {
  return new Fd(L(a));
}
function Hd(a, b) {
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
      if (b instanceof Ib) {
        a: {
          for (c = a.length, d = b.Ga, e = 0;;) {
            if (c <= e) {
              c = -1;
              break a;
            }
            g = a[e];
            if (g instanceof Ib && d === g.Ga) {
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
function Id(a, b, c) {
  this.c = a;
  this.i = b;
  this.da = c;
  this.m = 32374990;
  this.A = 0;
}
f = Id.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
  return this.da;
};
f.ba = function() {
  return this.i < this.c.length - 2 ? new Id(this.c, this.i + 2, this.da) : null;
};
f.X = function() {
  return (this.c.length - this.i) / 2;
};
f.G = function() {
  return Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.V = function() {
  return new nd(null, 2, 5, td, [this.c[this.i], this.c[this.i + 1]], null);
};
f.ca = function() {
  return this.i < this.c.length - 2 ? new Id(this.c, this.i + 2, this.da) : Kb;
};
f.P = function() {
  return this;
};
f.R = function(a, b) {
  return new Id(this.c, this.i, b);
};
f.L = function(a, b) {
  return R(b, this);
};
Id.prototype[Ba] = function() {
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
  var a = new nd(null, 2, 5, td, [this.c[this.i], this.c[this.i + 1]], null);
  this.i += 2;
  return a;
};
function qa(a, b, c, d) {
  this.meta = a;
  this.l = b;
  this.c = c;
  this.v = d;
  this.m = 16647951;
  this.A = 8196;
}
f = qa.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.keys = function() {
  return Q(Kd.j ? Kd.j(this) : Kd.call(null, this));
};
f.entries = function() {
  return Gd(L(this));
};
f.values = function() {
  return Q(Md.j ? Md.j(this) : Md.call(null, this));
};
f.has = function(a) {
  return gc(this, a, sc) === sc ? !1 : !0;
};
f.get = function(a, b) {
  return this.H(null, a, b);
};
f.forEach = function(a) {
  for (var b = L(this), c = null, d = 0, e = 0;;) {
    if (e < d) {
      var g = c.J(null, e), h = U(g, 0), g = U(g, 1);
      a.h ? a.h(g, h) : a.call(null, g, h);
      e += 1;
    } else {
      if (b = L(b)) {
        pc(b) ? (c = qb(b), b = rb(b), h = c, d = T(c), c = h) : (c = N(b), h = U(c, 0), c = g = U(c, 1), a.h ? a.h(c, h) : a.call(null, c, h), b = O(b), c = null, d = 0), e = 0;
      } else {
        return null;
      }
    }
  }
};
f.N = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  a = Hd(this.c, b);
  return -1 === a ? c : this.c[a + 1];
};
f.Ta = function() {
  return new Jd(this.c, 0, 2 * this.l);
};
f.K = function() {
  return this.meta;
};
f.X = function() {
  return this.l;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Pb(this);
};
f.w = function(a, b) {
  if (b && (b.m & 1024 || b.ub)) {
    var c = this.c.length;
    if (this.l === b.X(null)) {
      for (var d = 0;;) {
        if (d < c) {
          var e = b.H(null, this.c[d], sc);
          if (e !== sc) {
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
    return Ed(this, b);
  }
};
f.Ra = function() {
  return new Nd({}, this.c.length, D(this.c));
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.Na = function(a, b, c) {
  a = Hd(this.c, b);
  if (-1 === a) {
    if (this.l < Od) {
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
      return new qa(this.meta, this.l + 1, e, null);
    }
    a = ic;
    null != a ? a && (a.A & 4 || a.Gb) ? (d = vc(lb, kb(a), this), d = mb(d), a = mc(a), a = jc(d) && !(d ? d.m & 262144 || d.Lb || (d.m ? 0 : y(Ya, d)) : y(Ya, d)) ? new kc(d, a) : null == d ? null : Za(d, a)) : a = vc(Ga, a, this) : a = vc(cc, Kb, this);
    return Za(Ma(a, b, c), this.meta);
  }
  if (c === this.c[a + 1]) {
    return this;
  }
  b = D(this.c);
  b[a + 1] = c;
  return new qa(this.meta, this.l, b, null);
};
f.P = function() {
  var a = this.c;
  return 0 <= a.length - 2 ? new Id(a, 0, null) : null;
};
f.R = function(a, b) {
  return new qa(b, this.l, this.c, this.v);
};
f.L = function(a, b) {
  if (oc(b)) {
    return Ma(this, E.h(b, 0), E.h(b, 1));
  }
  for (var c = this, d = L(b);;) {
    if (null == d) {
      return c;
    }
    var e = N(d);
    if (oc(e)) {
      c = Ma(c, E.h(e, 0), E.h(e, 1)), d = O(d);
    } else {
      throw Error("conj on a map takes map entries or seqables of map entries");
    }
  }
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.N(null, c);
      case 3:
        return this.H(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.N(null, c);
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
  return this.N(null, a);
};
f.h = function(a, b) {
  return this.H(null, a, b);
};
var Od = 8;
qa.prototype[Ba] = function() {
  return Q(this);
};
function Nd(a, b, c) {
  this.La = a;
  this.Ma = b;
  this.c = c;
  this.m = 258;
  this.A = 56;
}
f = Nd.prototype;
f.X = function() {
  if (x(this.La)) {
    return Ac(this.Ma);
  }
  throw Error("count after persistent!");
};
f.N = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  if (x(this.La)) {
    return a = Hd(this.c, b), -1 === a ? c : this.c[a + 1];
  }
  throw Error("lookup after persistent!");
};
f.Wa = function(a, b) {
  if (x(this.La)) {
    if (b ? b.m & 2048 || b.vb || (b.m ? 0 : y(Pa, b)) : y(Pa, b)) {
      return nb(this, Pd.j ? Pd.j(b) : Pd.call(null, b), Qd.j ? Qd.j(b) : Qd.call(null, b));
    }
    for (var c = L(b), d = this;;) {
      var e = N(c);
      if (x(e)) {
        var g = e, c = O(c), d = nb(d, function() {
          var a = g;
          return Pd.j ? Pd.j(a) : Pd.call(null, a);
        }(), function() {
          var a = g;
          return Qd.j ? Qd.j(a) : Qd.call(null, a);
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
    return this.La = !1, new qa(null, Ac(this.Ma), this.c, null);
  }
  throw Error("persistent! called twice");
};
f.Oa = function(a, b, c) {
  if (x(this.La)) {
    a = Hd(this.c, b);
    if (-1 === a) {
      if (this.Ma + 2 <= 2 * Od) {
        return this.Ma += 2, this.c.push(b), this.c.push(c), this;
      }
      a = this.Ma;
      var d = this.c;
      a = Rd.h ? Rd.h(a, d) : Rd.call(null, a, d);
      return nb(a, b, c);
    }
    c !== this.c[a + 1] && (this.c[a + 1] = c);
    return this;
  }
  throw Error("assoc! after persistent!");
};
function Rd(a, b) {
  for (var c = kb(ic), d = 0;;) {
    if (d < a) {
      c = nb(c, b[d], b[d + 1]), d += 2;
    } else {
      return c;
    }
  }
}
function Sd() {
  this.val = !1;
}
function Td(a, b) {
  return a === b ? !0 : a === b || a instanceof V && b instanceof V && a.Ea === b.Ea ? !0 : P.h(a, b);
}
function Ud(a, b, c) {
  a = D(a);
  a[b] = c;
  return a;
}
function Vd(a, b, c, d) {
  a = a.Ia(b);
  a.c[c] = d;
  return a;
}
function Wd(a, b, c) {
  this.B = a;
  this.I = b;
  this.c = c;
}
f = Wd.prototype;
f.Ia = function(a) {
  if (a === this.B) {
    return this;
  }
  var b = Bc(this.I), c = Array(0 > b ? 4 : 2 * (b + 1));
  rc(this.c, 0, c, 0, 2 * b);
  return new Wd(a, this.I, c);
};
f.Pa = function() {
  var a = this.c;
  return Xd ? Xd(a) : Yd.call(null, a);
};
f.Ja = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if (0 === (this.I & e)) {
    return d;
  }
  var g = Bc(this.I & e - 1), e = this.c[2 * g], g = this.c[2 * g + 1];
  return null == e ? g.Ja(a + 5, b, c, d) : Td(c, e) ? g : d;
};
f.ja = function(a, b, c, d, e, g) {
  var h = 1 << (c >>> b & 31), k = Bc(this.I & h - 1);
  if (0 === (this.I & h)) {
    var l = Bc(this.I);
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
      k[c >>> b & 31] = Zd.ja(a, b + 5, c, d, e, g);
      for (e = d = 0;;) {
        if (32 > d) {
          0 !== (this.I >>> d & 1) && (k[d] = null != this.c[e] ? Zd.ja(a, b + 5, Gb(this.c[e]), this.c[e], this.c[e + 1], g) : this.c[e + 1], e += 2), d += 1;
        } else {
          break;
        }
      }
      return new $d(a, l + 1, k);
    }
    b = Array(2 * (l + 4));
    rc(this.c, 0, b, 0, 2 * k);
    b[2 * k] = d;
    b[2 * k + 1] = e;
    rc(this.c, 2 * k, b, 2 * (k + 1), 2 * (l - k));
    g.val = !0;
    a = this.Ia(a);
    a.c = b;
    a.I |= h;
    return a;
  }
  l = this.c[2 * k];
  h = this.c[2 * k + 1];
  if (null == l) {
    return l = h.ja(a, b + 5, c, d, e, g), l === h ? this : Vd(this, a, 2 * k + 1, l);
  }
  if (Td(d, l)) {
    return e === h ? this : Vd(this, a, 2 * k + 1, e);
  }
  g.val = !0;
  g = b + 5;
  d = ae ? ae(a, g, l, h, c, d, e) : be.call(null, a, g, l, h, c, d, e);
  e = 2 * k;
  k = 2 * k + 1;
  a = this.Ia(a);
  a.c[e] = null;
  a.c[k] = d;
  return a;
};
f.ia = function(a, b, c, d, e) {
  var g = 1 << (b >>> a & 31), h = Bc(this.I & g - 1);
  if (0 === (this.I & g)) {
    var k = Bc(this.I);
    if (16 <= k) {
      h = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
      h[b >>> a & 31] = Zd.ia(a + 5, b, c, d, e);
      for (d = c = 0;;) {
        if (32 > c) {
          0 !== (this.I >>> c & 1) && (h[c] = null != this.c[d] ? Zd.ia(a + 5, Gb(this.c[d]), this.c[d], this.c[d + 1], e) : this.c[d + 1], d += 2), c += 1;
        } else {
          break;
        }
      }
      return new $d(null, k + 1, h);
    }
    a = Array(2 * (k + 1));
    rc(this.c, 0, a, 0, 2 * h);
    a[2 * h] = c;
    a[2 * h + 1] = d;
    rc(this.c, 2 * h, a, 2 * (h + 1), 2 * (k - h));
    e.val = !0;
    return new Wd(null, this.I | g, a);
  }
  var l = this.c[2 * h], g = this.c[2 * h + 1];
  if (null == l) {
    return k = g.ia(a + 5, b, c, d, e), k === g ? this : new Wd(null, this.I, Ud(this.c, 2 * h + 1, k));
  }
  if (Td(c, l)) {
    return d === g ? this : new Wd(null, this.I, Ud(this.c, 2 * h + 1, d));
  }
  e.val = !0;
  e = this.I;
  k = this.c;
  a += 5;
  a = ce ? ce(a, l, g, b, c, d) : be.call(null, a, l, g, b, c, d);
  c = 2 * h;
  h = 2 * h + 1;
  d = D(k);
  d[c] = null;
  d[h] = a;
  return new Wd(null, e, d);
};
var Zd = new Wd(null, 0, []);
function $d(a, b, c) {
  this.B = a;
  this.l = b;
  this.c = c;
}
f = $d.prototype;
f.Ia = function(a) {
  return a === this.B ? this : new $d(a, this.l, D(this.c));
};
f.Pa = function() {
  var a = this.c;
  return de ? de(a) : ee.call(null, a);
};
f.Ja = function(a, b, c, d) {
  var e = this.c[b >>> a & 31];
  return null != e ? e.Ja(a + 5, b, c, d) : d;
};
f.ja = function(a, b, c, d, e, g) {
  var h = c >>> b & 31, k = this.c[h];
  if (null == k) {
    return a = Vd(this, a, h, Zd.ja(a, b + 5, c, d, e, g)), a.l += 1, a;
  }
  b = k.ja(a, b + 5, c, d, e, g);
  return b === k ? this : Vd(this, a, h, b);
};
f.ia = function(a, b, c, d, e) {
  var g = b >>> a & 31, h = this.c[g];
  if (null == h) {
    return new $d(null, this.l + 1, Ud(this.c, g, Zd.ia(a + 5, b, c, d, e)));
  }
  a = h.ia(a + 5, b, c, d, e);
  return a === h ? this : new $d(null, this.l, Ud(this.c, g, a));
};
function fe(a, b, c) {
  b *= 2;
  for (var d = 0;;) {
    if (d < b) {
      if (Td(c, a[d])) {
        return d;
      }
      d += 2;
    } else {
      return -1;
    }
  }
}
function ge(a, b, c, d) {
  this.B = a;
  this.Da = b;
  this.l = c;
  this.c = d;
}
f = ge.prototype;
f.Ia = function(a) {
  if (a === this.B) {
    return this;
  }
  var b = Array(2 * (this.l + 1));
  rc(this.c, 0, b, 0, 2 * this.l);
  return new ge(a, this.Da, this.l, b);
};
f.Pa = function() {
  var a = this.c;
  return Xd ? Xd(a) : Yd.call(null, a);
};
f.Ja = function(a, b, c, d) {
  a = fe(this.c, this.l, c);
  return 0 > a ? d : Td(c, this.c[a]) ? this.c[a + 1] : d;
};
f.ja = function(a, b, c, d, e, g) {
  if (c === this.Da) {
    b = fe(this.c, this.l, d);
    if (-1 === b) {
      if (this.c.length > 2 * this.l) {
        return b = 2 * this.l, c = 2 * this.l + 1, a = this.Ia(a), a.c[b] = d, a.c[c] = e, g.val = !0, a.l += 1, a;
      }
      c = this.c.length;
      b = Array(c + 2);
      rc(this.c, 0, b, 0, c);
      b[c] = d;
      b[c + 1] = e;
      g.val = !0;
      d = this.l + 1;
      a === this.B ? (this.c = b, this.l = d, a = this) : a = new ge(this.B, this.Da, d, b);
      return a;
    }
    return this.c[b + 1] === e ? this : Vd(this, a, b + 1, e);
  }
  return (new Wd(a, 1 << (this.Da >>> b & 31), [null, this, null, null])).ja(a, b, c, d, e, g);
};
f.ia = function(a, b, c, d, e) {
  return b === this.Da ? (a = fe(this.c, this.l, c), -1 === a ? (a = 2 * this.l, b = Array(a + 2), rc(this.c, 0, b, 0, a), b[a] = c, b[a + 1] = d, e.val = !0, new ge(null, this.Da, this.l + 1, b)) : P.h(this.c[a], d) ? this : new ge(null, this.Da, this.l, Ud(this.c, a + 1, d))) : (new Wd(null, 1 << (this.Da >>> a & 31), [null, this])).ia(a, b, c, d, e);
};
function be() {
  switch(arguments.length) {
    case 6:
      return ce(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    case 7:
      return ae(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
}
function ce(a, b, c, d, e, g) {
  var h = Gb(b);
  if (h === d) {
    return new ge(null, h, 2, [b, c, e, g]);
  }
  var k = new Sd;
  return Zd.ia(a, h, b, c, k).ia(a, d, e, g, k);
}
function ae(a, b, c, d, e, g, h) {
  var k = Gb(c);
  if (k === e) {
    return new ge(null, k, 2, [c, d, g, h]);
  }
  var l = new Sd;
  return Zd.ja(a, b, k, c, d, l).ja(a, b, e, g, h, l);
}
function he(a, b, c, d, e) {
  this.meta = a;
  this.Fa = b;
  this.i = c;
  this.s = d;
  this.v = e;
  this.m = 32374860;
  this.A = 0;
}
f = he.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
  return this.meta;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.V = function() {
  return null == this.s ? new nd(null, 2, 5, td, [this.Fa[this.i], this.Fa[this.i + 1]], null) : N(this.s);
};
f.ca = function() {
  if (null == this.s) {
    var a = this.Fa, b = this.i + 2;
    return ie ? ie(a, b, null) : Yd.call(null, a, b, null);
  }
  var a = this.Fa, b = this.i, c = O(this.s);
  return ie ? ie(a, b, c) : Yd.call(null, a, b, c);
};
f.P = function() {
  return this;
};
f.R = function(a, b) {
  return new he(b, this.Fa, this.i, this.s, this.v);
};
f.L = function(a, b) {
  return R(b, this);
};
he.prototype[Ba] = function() {
  return Q(this);
};
function Yd() {
  switch(arguments.length) {
    case 1:
      return Xd(arguments[0]);
    case 3:
      return ie(arguments[0], arguments[1], arguments[2]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
}
function Xd(a) {
  return ie(a, 0, null);
}
function ie(a, b, c) {
  if (null == c) {
    for (c = a.length;;) {
      if (b < c) {
        if (null != a[b]) {
          return new he(null, a, b, null, null);
        }
        var d = a[b + 1];
        if (x(d) && (d = d.Pa(), x(d))) {
          return new he(null, a, b + 2, d, null);
        }
        b += 2;
      } else {
        return null;
      }
    }
  } else {
    return new he(null, a, b, c, null);
  }
}
function je(a, b, c, d, e) {
  this.meta = a;
  this.Fa = b;
  this.i = c;
  this.s = d;
  this.v = e;
  this.m = 32374860;
  this.A = 0;
}
f = je.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
  return this.meta;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.V = function() {
  return N(this.s);
};
f.ca = function() {
  var a = this.Fa, b = this.i, c = O(this.s);
  return ke ? ke(null, a, b, c) : ee.call(null, null, a, b, c);
};
f.P = function() {
  return this;
};
f.R = function(a, b) {
  return new je(b, this.Fa, this.i, this.s, this.v);
};
f.L = function(a, b) {
  return R(b, this);
};
je.prototype[Ba] = function() {
  return Q(this);
};
function ee() {
  switch(arguments.length) {
    case 1:
      return de(arguments[0]);
    case 4:
      return ke(arguments[0], arguments[1], arguments[2], arguments[3]);
    default:
      throw Error([B("Invalid arity: "), B(arguments.length)].join(""));;
  }
}
function de(a) {
  return ke(null, a, 0, null);
}
function ke(a, b, c, d) {
  if (null == d) {
    for (d = b.length;;) {
      if (c < d) {
        var e = b[c];
        if (x(e) && (e = e.Pa(), x(e))) {
          return new je(a, b, c + 1, e, null);
        }
        c += 1;
      } else {
        return null;
      }
    }
  } else {
    return new je(a, b, c, d, null);
  }
}
function le(a, b, c, d, e, g) {
  this.meta = a;
  this.l = b;
  this.root = c;
  this.fa = d;
  this.ha = e;
  this.v = g;
  this.m = 16123663;
  this.A = 8196;
}
f = le.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.keys = function() {
  return Q(Kd.j ? Kd.j(this) : Kd.call(null, this));
};
f.entries = function() {
  return Gd(L(this));
};
f.values = function() {
  return Q(Md.j ? Md.j(this) : Md.call(null, this));
};
f.has = function(a) {
  return gc(this, a, sc) === sc ? !1 : !0;
};
f.get = function(a, b) {
  return this.H(null, a, b);
};
f.forEach = function(a) {
  for (var b = L(this), c = null, d = 0, e = 0;;) {
    if (e < d) {
      var g = c.J(null, e), h = U(g, 0), g = U(g, 1);
      a.h ? a.h(g, h) : a.call(null, g, h);
      e += 1;
    } else {
      if (b = L(b)) {
        pc(b) ? (c = qb(b), b = rb(b), h = c, d = T(c), c = h) : (c = N(b), h = U(c, 0), c = g = U(c, 1), a.h ? a.h(c, h) : a.call(null, c, h), b = O(b), c = null, d = 0), e = 0;
      } else {
        return null;
      }
    }
  }
};
f.N = function(a, b) {
  return I.o(this, b, null);
};
f.H = function(a, b, c) {
  return null == b ? this.fa ? this.ha : c : null == this.root ? c : this.root.Ja(0, Gb(b), b, c);
};
f.K = function() {
  return this.meta;
};
f.X = function() {
  return this.l;
};
f.G = function() {
  var a = this.v;
  return null != a ? a : this.v = a = Pb(this);
};
f.w = function(a, b) {
  return Ed(this, b);
};
f.Ra = function() {
  return new me({}, this.root, this.l, this.fa, this.ha);
};
f.Na = function(a, b, c) {
  if (null == b) {
    return this.fa && c === this.ha ? this : new le(this.meta, this.fa ? this.l : this.l + 1, this.root, !0, c, null);
  }
  a = new Sd;
  b = (null == this.root ? Zd : this.root).ia(0, Gb(b), b, c, a);
  return b === this.root ? this : new le(this.meta, a.val ? this.l + 1 : this.l, b, this.fa, this.ha, null);
};
f.P = function() {
  if (0 < this.l) {
    var a = null != this.root ? this.root.Pa() : null;
    return this.fa ? R(new nd(null, 2, 5, td, [null, this.ha], null), a) : a;
  }
  return null;
};
f.R = function(a, b) {
  return new le(b, this.l, this.root, this.fa, this.ha, this.v);
};
f.L = function(a, b) {
  if (oc(b)) {
    return Ma(this, E.h(b, 0), E.h(b, 1));
  }
  for (var c = this, d = L(b);;) {
    if (null == d) {
      return c;
    }
    var e = N(d);
    if (oc(e)) {
      c = Ma(c, E.h(e, 0), E.h(e, 1)), d = O(d);
    } else {
      throw Error("conj on a map takes map entries or seqables of map entries");
    }
  }
};
f.call = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.N(null, c);
      case 3:
        return this.H(null, c, d);
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.h = function(a, c) {
    return this.N(null, c);
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
  return this.N(null, a);
};
f.h = function(a, b) {
  return this.H(null, a, b);
};
var ic = new le(null, 0, null, !1, null, Qb);
le.prototype[Ba] = function() {
  return Q(this);
};
function me(a, b, c, d, e) {
  this.B = a;
  this.root = b;
  this.count = c;
  this.fa = d;
  this.ha = e;
  this.m = 258;
  this.A = 56;
}
function ne(a, b) {
  if (a.B) {
    if (b ? b.m & 2048 || b.vb || (b.m ? 0 : y(Pa, b)) : y(Pa, b)) {
      return oe(a, Pd.j ? Pd.j(b) : Pd.call(null, b), Qd.j ? Qd.j(b) : Qd.call(null, b));
    }
    for (var c = L(b), d = a;;) {
      var e = N(c);
      if (x(e)) {
        var g = e, c = O(c), d = oe(d, function() {
          var a = g;
          return Pd.j ? Pd.j(a) : Pd.call(null, a);
        }(), function() {
          var a = g;
          return Qd.j ? Qd.j(a) : Qd.call(null, a);
        }())
      } else {
        return d;
      }
    }
  } else {
    throw Error("conj! after persistent");
  }
}
function oe(a, b, c) {
  if (a.B) {
    if (null == b) {
      a.ha !== c && (a.ha = c), a.fa || (a.count += 1, a.fa = !0);
    } else {
      var d = new Sd;
      b = (null == a.root ? Zd : a.root).ja(a.B, 0, Gb(b), b, c, d);
      b !== a.root && (a.root = b);
      d.val && (a.count += 1);
    }
    return a;
  }
  throw Error("assoc! after persistent!");
}
f = me.prototype;
f.X = function() {
  if (this.B) {
    return this.count;
  }
  throw Error("count after persistent!");
};
f.N = function(a, b) {
  return null == b ? this.fa ? this.ha : null : null == this.root ? null : this.root.Ja(0, Gb(b), b);
};
f.H = function(a, b, c) {
  return null == b ? this.fa ? this.ha : c : null == this.root ? c : this.root.Ja(0, Gb(b), b, c);
};
f.Wa = function(a, b) {
  return ne(this, b);
};
f.Xa = function() {
  var a;
  if (this.B) {
    this.B = null, a = new le(null, this.count, this.root, this.fa, this.ha, null);
  } else {
    throw Error("persistent! called twice");
  }
  return a;
};
f.Oa = function(a, b, c) {
  return oe(this, b, c);
};
var $c = function $c() {
  var b = 0 < arguments.length ? new M(Array.prototype.slice.call(arguments, 0), 0) : null;
  return $c.C(b);
};
$c.C = function(a) {
  for (var b = L(a), c = kb(ic);;) {
    if (b) {
      a = O(O(b));
      var d = N(b), b = N(O(b)), c = nb(c, d, b), b = a;
    } else {
      return mb(c);
    }
  }
};
$c.Y = 0;
$c.S = function(a) {
  return $c.C(L(a));
};
function pe(a, b) {
  this.W = a;
  this.da = b;
  this.m = 32374988;
  this.A = 0;
}
f = pe.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
  return this.da;
};
f.ba = function() {
  var a = this.W, a = (a ? a.m & 128 || a.Ua || (a.m ? 0 : y(Ka, a)) : y(Ka, a)) ? this.W.ba(null) : O(this.W);
  return null == a ? null : new pe(a, this.da);
};
f.G = function() {
  return Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.V = function() {
  return this.W.V(null).bb();
};
f.ca = function() {
  var a = this.W, a = (a ? a.m & 128 || a.Ua || (a.m ? 0 : y(Ka, a)) : y(Ka, a)) ? this.W.ba(null) : O(this.W);
  return null != a ? new pe(a, this.da) : Kb;
};
f.P = function() {
  return this;
};
f.R = function(a, b) {
  return new pe(this.W, b);
};
f.L = function(a, b) {
  return R(b, this);
};
pe.prototype[Ba] = function() {
  return Q(this);
};
function Kd(a) {
  return (a = L(a)) ? new pe(a, null) : null;
}
function Pd(a) {
  return Qa(a);
}
function qe(a, b) {
  this.W = a;
  this.da = b;
  this.m = 32374988;
  this.A = 0;
}
f = qe.prototype;
f.toString = function() {
  return xb(this);
};
f.equiv = function(a) {
  return this.w(null, a);
};
f.K = function() {
  return this.da;
};
f.ba = function() {
  var a = this.W, a = (a ? a.m & 128 || a.Ua || (a.m ? 0 : y(Ka, a)) : y(Ka, a)) ? this.W.ba(null) : O(this.W);
  return null == a ? null : new qe(a, this.da);
};
f.G = function() {
  return Nb(this);
};
f.w = function(a, b) {
  return $b(this, b);
};
f.T = function(a, b) {
  return uc(b, this);
};
f.U = function(a, b, c) {
  return yc(b, c, this);
};
f.V = function() {
  return this.W.V(null).cb();
};
f.ca = function() {
  var a = this.W, a = (a ? a.m & 128 || a.Ua || (a.m ? 0 : y(Ka, a)) : y(Ka, a)) ? this.W.ba(null) : O(this.W);
  return null != a ? new qe(a, this.da) : Kb;
};
f.P = function() {
  return this;
};
f.R = function(a, b) {
  return new qe(this.W, b);
};
f.L = function(a, b) {
  return R(b, this);
};
qe.prototype[Ba] = function() {
  return Q(this);
};
function Md(a) {
  return (a = L(a)) ? new qe(a, null) : null;
}
function Qd(a) {
  return Ra(a);
}
function Hc(a) {
  if (a && (a.A & 4096 || a.xb)) {
    return a.name;
  }
  if ("string" === typeof a) {
    return a;
  }
  throw Error([B("Doesn't support name: "), B(a)].join(""));
}
function re(a, b, c, d, e, g, h) {
  var k = la;
  la = null == la ? null : la - 1;
  try {
    if (null != la && 0 > la) {
      return J(a, "#");
    }
    J(a, c);
    if (0 === wa.j(g)) {
      L(h) && J(a, function() {
        var a = se.j(g);
        return x(a) ? a : "...";
      }());
    } else {
      if (L(h)) {
        var l = N(h);
        b.o ? b.o(l, a, g) : b.call(null, l, a, g);
      }
      for (var m = O(h), n = wa.j(g) - 1;;) {
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
    la = k;
  }
}
function te(a, b) {
  for (var c = L(b), d = null, e = 0, g = 0;;) {
    if (g < e) {
      var h = d.J(null, g);
      J(a, h);
      g += 1;
    } else {
      if (c = L(c)) {
        d = c, pc(d) ? (c = qb(d), e = rb(d), d = c, h = T(c), c = e, e = h) : (h = N(d), J(a, h), c = O(d), d = null, e = 0), g = 0;
      } else {
        return null;
      }
    }
  }
}
var ue = {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"};
function we(a) {
  return [B('"'), B(a.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(a) {
    return ue[a];
  })), B('"')].join("");
}
function xe(a, b, c) {
  if (null == a) {
    return J(b, "nil");
  }
  if (void 0 === a) {
    return J(b, "#\x3cundefined\x3e");
  }
  if (x(function() {
    var b = fc(c, ua);
    return x(b) ? (b = a ? a.m & 131072 || a.wb ? !0 : a.m ? !1 : y(Wa, a) : y(Wa, a)) ? mc(a) : b : b;
  }())) {
    J(b, "^");
    var d = mc(a);
    Z.o ? Z.o(d, b, c) : Z.call(null, d, b, c);
    J(b, " ");
  }
  return null == a ? J(b, "nil") : a.Bb ? a.Mb(a, b, c) : a && (a.m & 2147483648 || a.O) ? a.D(null, b, c) : (null == a ? null : a.constructor) === Boolean || "number" === typeof a ? J(b, "" + B(a)) : null != a && a.constructor === Object ? (J(b, "#js "), d = Y.h(function(b) {
    return new nd(null, 2, 5, td, [Gc.j(b), a[b]], null);
  }, qc(a)), ye.M ? ye.M(d, Z, b, c) : ye.call(null, d, Z, b, c)) : xa(a) ? re(b, Z, "#js [", " ", "]", c, a) : x("string" == typeof a) ? x(ta.j(c)) ? J(b, we(a)) : J(b, a) : jc(a) ? te(b, bc(["#\x3c", "" + B(a), "\x3e"], 0)) : a instanceof Date ? (d = function(a, b) {
    for (var c = "" + B(a);;) {
      if (T(c) < b) {
        c = [B("0"), B(c)].join("");
      } else {
        return c;
      }
    }
  }, te(b, bc(['#inst "', "" + B(a.getUTCFullYear()), "-", d(a.getUTCMonth() + 1, 2), "-", d(a.getUTCDate(), 2), "T", d(a.getUTCHours(), 2), ":", d(a.getUTCMinutes(), 2), ":", d(a.getUTCSeconds(), 2), ".", d(a.getUTCMilliseconds(), 3), "-", '00:00"'], 0))) : x(a instanceof RegExp) ? te(b, bc(['#"', a.source, '"'], 0)) : (a ? a.m & 2147483648 || a.O || (a.m ? 0 : y(gb, a)) : y(gb, a)) ? ib(a, b, c) : te(b, bc(["#\x3c", "" + B(a), "\x3e"], 0));
}
function Z(a, b, c) {
  var d = ze.j(c);
  return x(d) ? (c = hc.o(c, Ae, xe), d.o ? d.o(a, b, c) : d.call(null, a, b, c)) : xe(a, b, c);
}
function cd() {
  var a = 0 < arguments.length ? new M(Array.prototype.slice.call(arguments, 0), 0) : null;
  return Be(a);
}
function Be(a) {
  var b = oa(), c;
  (c = null == a) || (c = L(a), c = x(c) ? !1 : !0);
  if (c) {
    b = "";
  } else {
    c = B;
    var d = new ha;
    a: {
      var e = new vb(d);
      Z(N(a), e, b);
      a = L(O(a));
      for (var g = null, h = 0, k = 0;;) {
        if (k < h) {
          var l = g.J(null, k);
          J(e, " ");
          Z(l, e, b);
          k += 1;
        } else {
          if (a = L(a)) {
            g = a, pc(g) ? (a = qb(g), h = rb(g), g = a, l = T(a), a = h, h = l) : (l = N(g), J(e, " "), Z(l, e, b), a = O(g), g = null, h = 0), k = 0;
          } else {
            break a;
          }
        }
      }
    }
    b = "" + c(d);
  }
  return b;
}
function ye(a, b, c, d) {
  return re(c, function(a, c, d) {
    var k = Qa(a);
    b.o ? b.o(k, c, d) : b.call(null, k, c, d);
    J(c, " ");
    a = Ra(a);
    return b.o ? b.o(a, c, d) : b.call(null, a, c, d);
  }, "{", ", ", "}", d, L(a));
}
M.prototype.O = !0;
M.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
Ic.prototype.O = !0;
Ic.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
he.prototype.O = !0;
he.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
Id.prototype.O = !0;
Id.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
ud.prototype.O = !0;
ud.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
Fc.prototype.O = !0;
Fc.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
le.prototype.O = !0;
le.prototype.D = function(a, b, c) {
  return ye(this, Z, b, c);
};
je.prototype.O = !0;
je.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
yd.prototype.O = !0;
yd.prototype.D = function(a, b, c) {
  return re(b, Z, "[", " ", "]", c, this);
};
Mc.prototype.O = !0;
Mc.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
Xc.prototype.O = !0;
Xc.prototype.D = function(a, b, c) {
  J(b, "#\x3cAtom: ");
  Z(this.state, b, c);
  return J(b, "\x3e");
};
qe.prototype.O = !0;
qe.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
nd.prototype.O = !0;
nd.prototype.D = function(a, b, c) {
  return re(b, Z, "[", " ", "]", c, this);
};
Dc.prototype.O = !0;
Dc.prototype.D = function(a, b) {
  return J(b, "()");
};
qa.prototype.O = !0;
qa.prototype.D = function(a, b, c) {
  return ye(this, Z, b, c);
};
pe.prototype.O = !0;
pe.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
Cc.prototype.O = !0;
Cc.prototype.D = function(a, b, c) {
  return re(b, Z, "(", " ", ")", c, this);
};
var Ce = {}, De = function De(b) {
  if (b ? b.qb : b) {
    return b.qb(b);
  }
  var c;
  c = De[r(null == b ? null : b)];
  if (!c && (c = De._, !c)) {
    throw z("IEncodeJS.-clj-\x3ejs", b);
  }
  return c.call(null, b);
};
function Ee(a) {
  return (a ? x(x(null) ? null : a.pb) || (a.kb ? 0 : y(Ce, a)) : y(Ce, a)) ? De(a) : "string" === typeof a || "number" === typeof a || a instanceof V || a instanceof Ib ? Fe.j ? Fe.j(a) : Fe.call(null, a) : Be(bc([a], 0));
}
var Fe = function Fe(b) {
  if (null == b) {
    return null;
  }
  if (b ? x(x(null) ? null : b.pb) || (b.kb ? 0 : y(Ce, b)) : y(Ce, b)) {
    return De(b);
  }
  if (b instanceof V) {
    return Hc(b);
  }
  if (b instanceof Ib) {
    return "" + B(b);
  }
  if (nc(b)) {
    var c = {};
    b = L(b);
    for (var d = null, e = 0, g = 0;;) {
      if (g < e) {
        var h = d.J(null, g), k = U(h, 0), h = U(h, 1);
        c[Ee(k)] = Fe(h);
        g += 1;
      } else {
        if (b = L(b)) {
          pc(b) ? (e = qb(b), b = rb(b), d = e, e = T(e)) : (e = N(b), d = U(e, 0), e = U(e, 1), c[Ee(d)] = Fe(e), b = O(b), d = null, e = 0), g = 0;
        } else {
          break;
        }
      }
    }
    return c;
  }
  if (null == b ? 0 : b ? b.m & 8 || b.Fb || (b.m ? 0 : y(Fa, b)) : y(Fa, b)) {
    c = [];
    b = L(Y.h(Fe, b));
    d = null;
    for (g = e = 0;;) {
      if (g < e) {
        k = d.J(null, g), c.push(k), g += 1;
      } else {
        if (b = L(b)) {
          d = b, pc(d) ? (b = qb(d), g = rb(d), d = b, e = T(b), b = g) : (b = N(d), c.push(b), b = O(d), d = null, e = 0), g = 0;
        } else {
          break;
        }
      }
    }
    return c;
  }
  return b;
};
var ua = new V(null, "meta", "meta", 1499536964), va = new V(null, "dup", "dup", 556298533), ad = new V(null, "validator", "validator", -1966190681), Ge = new V(null, "width", "width", -384071477), Ae = new V(null, "fallback-impl", "fallback-impl", -1501286995), He = new V(null, "icon", "icon", 1679606541), ra = new V(null, "flush-on-newline", "flush-on-newline", -151457939), Ie = new V(null, "title", "title", 636505583), ta = new V(null, "readably", "readably", 1129599760), se = new V(null, "more-marker", 
"more-marker", -14717935), Je = new V(null, "resizable", "resizable", -2107060206), wa = new V(null, "print-length", "print-length", 1931866356), ze = new V(null, "alt-impl", "alt-impl", 670969595), Ke = new V(null, "height", "height", 1025178622);
var Le = require("app"), Me = require("browser-window"), Ne = require("crash-reporter"), Oe = require("process"), Pe = Zc ? Zc(null) : Yc.call(null, null), Qe = [B(Oe.cwd()), B("\\resources\\app\\assets")].join(""), Re = Fe(new qa(null, 5, [Ie, "Toby - A YouTube player for the desktop", Ge, 640, Ke, 400, He, [B(Qe), B("\\images\\t.png")].join(""), Je, !0], null));
function Se() {
  var a = new Me(Re);
  bd.h ? bd.h(Pe, a) : bd.call(null, Pe, a);
  (Rb.j ? Rb.j(Pe) : Rb.call(null, Pe)).loadUrl([B("file://"), B(Qe), B("\\html\\toby.html")].join(""));
  return (Rb.j ? Rb.j(Pe) : Rb.call(null, Pe)).on("closed", function() {
    return bd.h ? bd.h(Pe, null) : bd.call(null, Pe, null);
  });
}
Ne.start();
Le.on("window-all-closed", function() {
  var a;
  P.h(process.platform, "darwin") ? a = null : (console.log("app.quit called"), a = Le.quit());
  return a;
});
Le.on("ready", function() {
  return Se();
});

})();
