from json import dumps


def to_json(x: list[float], **y: list[float]) -> str:
    result = {}

    for key, val in y.items():
        data = [{"x": x0, "y": y0} for x0, y0 in zip(x, val)]
        result[key] = data
    return dumps(result)


def to_json_bulk(x: list[float], E: list[float], **y: list[list[float]]) -> str:
    result = {}
    result["E"] = [[{"x": x[0], "y": En}, {"x": x[-1], "y": En}] for En in E]

    for key, val in y.items():
        data = [[{"x": x0, "y": y0} for x0, y0 in zip(x, yn)] for yn in val]
        result[key] = data
    return dumps(result)
