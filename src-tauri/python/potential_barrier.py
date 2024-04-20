from numpy import sqrt, e, linspace, linalg
from json_export import to_json
from sys import argv


def potential_barrier(x0, x1, a, E, V0, m, h_, samples=1000):
    x = linspace(x0, x1, samples)

    k1 = k3 = 1/h_*sqrt(2*m*E)
    k2 = 1/h_*sqrt(complex(2*m*(E-V0)))

    A = [
        [1, -1, -1, 0],
        [-k1, -k2, k2, 0],
        [0, e**(1j*k2*a), e**(-1j*k2*a), -e**(1j*k3*a)],
        [0, k2*e**(1j*k2*a), -k2*e**(-1j*k2*a), -k3*e**(1j*k3*a)]
    ]
    b = [-1, -k1, 0, 0]
    R, C, D, T = linalg.solve(A, b)

    y = [_psi(x0, a, T, D, C, R, k1, k2, k3) for x0 in x]

    return to_json(
        x.tolist(),
        re=[y0.real for y0 in y],
        im=[y0.imag for y0 in y],
        psi_sq=[abs(y0)**2 for y0 in y]
    )


def _psi(x, a, T, D, C, R, k1, k2, k3):
    if x < 0:
        return e**(1j*k1*x) + R*e**(-1j*k1*x)
    elif 0 <= x < a:
        return C*e**(1j*k2*x) + D*e**(-1j*k2*x)
    else:
        return T*e**(1j*k3*x)


print(potential_barrier(float(argv[1]), float(argv[2]), float(
    argv[3]), float(argv[4]), float(argv[5]), float(argv[6]), float(argv[7])))
