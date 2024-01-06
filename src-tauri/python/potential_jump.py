from json_export import to_json
from numpy import power, e, arange, sqrt
from sys import argv


def potential_jump(x0, x1, E, V0, m, h_, dx=0.01) -> str:
    x = arange(x0, x1, dx)
    y = [_psi(x0, E, V0, m, h_) for x0 in x]

    return to_json(
        x.tolist(),
        re=[y0.real for y0 in y],
        im=[y0.imag for y0 in y],
        psi_sq=[abs(y0)**2 for y0 in y]
    )


def _psi(x: float, E: float, V0: float, m: float, h_: float) -> float:
    k1: complex = 1/h_ * sqrt(complex(2*m*E))
    k2: complex = 1/h_ * sqrt(complex(2*m*(E-V0)))
    T: complex = 2*k1/(k1+k2)
    R: complex = (k1-k2)/(k1+k2)

    if x < 0:
        return power(e, 1j*k1*x) + R*power(e, -1j*k1*x)
    else:
        return T*power(e, 1j*k2*x)


print(potential_jump(float(argv[1]), float(argv[2]), float(
    argv[3]), float(argv[4]), float(argv[5]), float(argv[6])))
