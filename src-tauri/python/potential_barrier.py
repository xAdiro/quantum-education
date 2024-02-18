from numpy import sqrt, e, arange, sin, cos, linalg, array, dot
from json_export import to_json


def potential_barrier(x0, x1, a, E, V0, m, h_, dx=0.01):
    x = arange(x0, x1, dx)

    k1 = k3 = 1/h_*sqrt(2*m*E)
    k2 = 1/h_*sqrt(complex(2*m*(E-V0)))

    T = (4*k1*k2*e**(1j*k2*a))/((k1+k2)*(k2+k3)-(k3-k2)*(k1-k2)*e**(2j*k2*a))
    D = (2*k1*(k2-k3)) / \
        ((k2-k1)*(k2-k3)-(k2+k3)*e**(-2j*k2*a))
    C = (2*k1+D*(k2-k1))/(k1+k2)
    R = C+D-1

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


def potential_barrier_test():
    x = arange(-5, 5, 0.01)

    a = 2
    h_ = 1
    m = 1
    E = 6
    V0 = 4

    k1 = k3 = 1/h_*sqrt(2*m*E)
    k2 = 1/h_*sqrt(complex(2*m*(E-V0)))

    # T = (4*k1*k2*e**(1j*k2*a))/((k1+k2)*(k2+k3)-(k3-k2)*(k1-k2)*e**(2j*k2*a))
    # C = (k2+k3)/(2*k2)*T*e**(1j*a*(k3-k2))
    # D = ((k1+k2)*C+2*k1)/(k2+k1)

    # D = (2*k1*(k3-k2))/((k2-k1)*(k2-k3)-(k2+k3)*e**(-2j*k2*a))
    # C = (k2-k1)/(k1+k2)*D + 2*k1
    # T = (C*e**(1j*k2*a) + D*e**(-1j*k2*a))/e**(1j*k3*a)

    # T = (2*k1)/(k1-k2)*e**(-1j*k2*a)
    # R = -1 + T*e**(-2j*(k1+k2)*a)
    # C = k2*(k1+k2)-R/(k2-k1) - T/(2*k2*e**(1j*(k1-k2)*a))
    # D = ((k1+k2)*C+2*k1)/(k2+k1)

    A = array([
        [k1+k2, k1-k2],
        # [e**(1j*k2*a), e**(-1j*k2*a), -e**(1j*k3*a)],
        # [k2*e**(1j*k2*a), -k2*e**(-1j*k2*a), -k3*e**(1j*k3*a)],
        [e**(1j*k2*a)*(k3-k2), e**(-1j*k2*a)]
    ], dtype=complex)
    print(f"A: {A}")

    B = array([k1, 0], dtype=complex)

    C, D = linalg.solve(A, B)
    R = C + D - 1
    T = C*e**(1j*k2*a) - D*e**(-1j*k2*a)

    ##
    # C = k1*(k2+k3)/((k1-k2)*(k3-k2))-k1
    # D = ((k1+k2)*C+2*k1)/(k2+k1)
    # R = C + D - 1
    # T = C*e**(1j*a*(k2)) + D*e**(-1j*a*(k2))/k3
    ##

    print(C, D, R, T)
    # print(abs(1+R-C-D))
    # print(abs(k1-k1*R-k2*C+k2*D))
    # print(abs(C*e**(1j*k2*a)+D*e**(-1j*k2*a)-T*e**(1j*k3*a)))
    # print(abs(k2*C*e**(1j*k2*a)-k2*D*e**(-1j*k2*a) - k3*T*e**(1j*k3*a)))
    # print(T, R, C, D)

    y = [_psi(x0, a, T, D, C, R, k1, k2, k3) for x0 in x]

    import matplotlib.pyplot as plt
    plt.plot(x, [y0.real for y0 in y])
    plt.plot(x, [y0.imag for y0 in y])
    plt.show()


potential_barrier_test()
