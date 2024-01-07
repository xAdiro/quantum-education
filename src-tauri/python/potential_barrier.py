from numpy import sqrt, e, arange
from json_export import to_json


def potential_barrier(x0, x1, a, E, V0, m, h_, dx=0.01):
    x = arange(x0, x1, dx)
    y = [_psi(x0, a, E, V0, m, h_) for x0 in x]

    return to_json(
        x.tolist(),
        re=[y0.real for y0 in y],
        im=[y0.imag for y0 in y],
        psi_sq=[abs(y0)**2 for y0 in y]
    )


def _psi(x, a, E, V0, m, h_):
    k1 = k3 = 1/h_*sqrt(2*m*E)
    k2 = 1/h_*sqrt(complex(2*m*(E-V0)))

    T = (4*k1*k2*e**(1j*k2*a))/((k1+k2)*(k2+k3)-(k3-k2)*(k1-k2)*e**(2j*k2*a))
    C = (T * k3*(k1-k2)/(k2*(k1+k2)) * e**(1j*a*(k1+k2))) / \
        (1 - e**(1j*a*(k1+k2)) * (k2-k1)/(k1+k2))
    D = C*(k1+k2)/(k2-k1)
    R = C+D-1

    if x < 0:
        return e**(1j*k1*x) + R*e**(-1j*k1*x)
    elif 0 <= x < a:
        return C*e**(1j*k2*x) + D*e**(-1j*k2*x)
    else:
        return T*e**(1j*k3*x)


def potential_barrier_test():
    x = arange(-5, 5, 0.01)
    y = [_psi(x0, 1, 1, 3, 1, 1) for x0 in x]

    import matplotlib.pyplot as plt

    plt.plot(x, [y0.real for y0 in y])
    plt.plot(x, [y0.imag for y0 in y])
    plt.show()


potential_barrier_test()
