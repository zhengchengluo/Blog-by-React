function clamp(value,min,max) {
	if (value < min) {
		return min;
	}
	if (value > max) {
		return max;
	}
	return value;
}

export function convertColorToString(color) {
	const {type, values} = color;

	//color的值是rgb 或 hsl 值
	if (type.indexOf('rgb') > -1) {
		for (let i = 0; i < 3; i++) {
			values[i] = parseInt(values[i]);
		}
	}

	let colorString;

	if (type.indexOf('hsl') > -1) {
		colorString = `${color.type}(${values[0]},${values[1]}%,${values[2]}%`;
	} else {
		colorString += `${color.type}(${values[0]},${values[1]},${values[2]}`;
	}
	if (values.length === 4) {
       colorString += `, ${color.values[3]})`;
    } else {
       colorString += ')';
    }

    return colorString;
}
//将color的值转为{type,values}的对象, #nnn的typeundefined，rgb等type为rgb去'('前面的字符
export function decomposeColor(color) {
	if (color.charAt(0) === '#') {
		return decomposeColor(convertHexToRGB(color));
	}

	const marker = color.indexOf('(');
	const type = color.substring(0,marker);
	let values = color.substring(marker + 1,color.length -1).split(',');
	values = values.map((value) => parseFloat(value));

	return {type: type,values: values}
}

export function getContrastRatio(foreground,background) {
	const lumA = getLuminance(foreground);
	const lumB = getLuminance(background);
	const contrastRatio = (Math.max(lumA,lumB) + 0.05) / (Math.min(lumA,lumB) + 0.05);

	return Number(contrastRatio.toFixed(2));
}

export function getLuminance(color) {
	color = decomposeColor(color);

	if (color.type.indexOf('rgb') > -1) {
		const rgb = color.values.map((val) => {
			val /= 255;
			return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);

		})
		return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3)); // Truncate at 3 digits
	} else if (color.type.indexOf('hsl') > -1) {
	    return color.values[2] / 100;
	}
}