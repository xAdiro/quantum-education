import matplotlib.pyplot as plt
from numpy import arange
from math import sqrt, pi, tan, sin, cos, e
from json_export import to_json
from sys import argv


def finite_well(x0, x1, a, V0, m, h_, dx=0.01):
    C = a/h_ * sqrt(2*m*V0)
    x = arange(x0, x1, dx)
    y = {}

    for i, k in enumerate(_possible_k(a, C)):
        y[f"n{i}"] = [_psi(xn, k, a, V0, m, h_, (i+1) % 2 == 0) for xn in x]

    return to_json(
        x.tolist(),
        **y
    )


def _psi(x, k, a, V0, m, h_, even, dx=0.01):
    A = B = 1

    if even:
        # B=0
        y = -k/tan(k*a/2)

        if -a/2 <= x < a/2:
            return A*sin(k*x)

        elif x < -a/2:
            C = A*sin(-k*a/2)/e**(-y*a/2)
            return C*e**(y*x)
        else:
            D = A*sin(k*a/2)/e**(-y*a/2)
            return D*e**(-y*x)

    else:
        # A=0
        y = k*tan(k*a/2)

        if -a/2 <= x < a/2:
            return B*cos(k*x)

        elif x < -a/2:
            C = B*cos(-k*a/2)/e**(-y*a/2)
            return C*e**(y*x)
        else:
            D = B*cos(k*a/2)/e**(-y*a/2)
            return D*e**(-y*x)


def _possible_k(a, C):
    max_n = 1

    while True:
        if (2*max_n-1)/(pi/(2*a)) < C/a:
            max_n += 1
        else:
            break

    k = []

    for n in range(1, max_n+1):
        x1 = (2*n-1)*(pi/(2*a))
        x2 = (2*n+1)*(pi/(2*a))

        k.append(_zero(x1, x2, C, a))

    return k


def _zero(x1, x2, C, a, eps=0.01):
    if x1 < -C/a:
        x1 = -C/a
    if x2 > C/a:
        x2 = C/a

    while True:
        s = (x1+x2)/2

        y = tan(s*a) + (s*a)/sqrt(C**2-s**2*a**2)

        if abs(y) <= eps:
            return s

        if y < 0:
            x1 = s
        else:
            x2 = s


print(finite_well(float(argv[1]), float(argv[2]), float(
    argv[3]), float(argv[4]), float(argv[5]), float(argv[6])))
