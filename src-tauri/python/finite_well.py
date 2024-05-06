from numpy import linspace, zeros
from math import sqrt, pi, tan, sin, cos, e, ceil
from json_export import to_json_bulk
from sys import argv


def finite_well(x0, x1, a, V0, m, h_, samples=1000):
    x = linspace(x0, x1, samples)
    y = {}
    E = {}
    psi_sq = {}

    ks = [2*v/a for v in _possible_v(a, m, V0, h_)]
    y = zeros(len(ks))
    E = zeros(len(ks))

    y = [[_psi(xn, k, a, (i+1) % 2 == 0) for xn in x]
         for i, k in enumerate(ks)]
    E = [(k*h_)**2/(2*m) - V0 for k in ks]
    psi_sq = [[abs(y0)**2 for y0 in yn] for yn in y]

    return to_json_bulk(
        x.tolist(),
        E,
        re=y,
        psi_sq=psi_sq
    )


def _psi(x, k, a, even) -> float:
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


def _possible_v(a, m, V0, h_):
    u0_2 = (m*a**2)/(2*h_**2)*V0
    u0 = sqrt(u0_2)

    max_n = ceil(2*u0/pi)

    v = []

    for n in range(1, max_n):
        v_min = pi/2*(n-1)
        v_max = pi/2*n

        v.append(_zero(v_min, v_max, u0_2, n % 2 == 0))

    # last solution
    v_min = pi/2*(max_n-1)
    v_max = u0
    v.append(_zero(v_min, v_max, u0_2, max_n % 2 == 0))

    return v


def _zero(x1, x2, u0_2, even):
    eps = abs(x2-x1)/1000

    while True:
        s = (x1+x2)/2

        if not even:
            y = s*tan(s) - sqrt(u0_2-s**2)
        else:
            y = -s/tan(s) - sqrt(u0_2-s**2)

        if abs(y) <= eps:
            return s

        if y < 0:
            x1 = s
        else:
            x2 = s


print(finite_well(float(argv[1]), float(argv[2]), float(
    argv[3]), float(argv[4]), float(argv[5]), float(argv[6])))
