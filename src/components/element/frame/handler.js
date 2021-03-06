import Handler from "../../../factory/handler";
import {$set, isUndef} from "../../../core/util";


export function parseRule(rule) {
    let props = rule.props;
    if (!props.type) $set(props, 'type', 'input');
    if (!props.icon) $set(props, 'icon', 'el-icon-upload2');
    if (!props.height) $set(props, 'height', '370px');
    if (isUndef(props.spin)) $set(props, 'spin', true);
    if (!props.title) $set(props, 'title', '请选择' + rule.title);
    if (!props.maxLength) $set(props, 'maxLength', 0);

    let handleIcon = props.handleIcon;
    if (props.type === 'file' && props.handleIcon === undefined)
        handleIcon = false;
    else
        handleIcon = props.handleIcon === true || props.handleIcon === undefined ? 'el-icon-view' : props.handleIcon;
    $set(props, 'handleIcon', handleIcon);

    if (props.allowRemove === undefined) $set(props, 'allowRemove', true);

}

export default class handler extends Handler {
    init() {
        parseRule(this.rule);
    }

    toFormValue(value) {
        let parseValue, oldValue = value, isArr = Array.isArray(oldValue);
        if (oldValue === '')
            parseValue = [];
        else if (!isArr)
            parseValue = [oldValue];
        else
            parseValue = oldValue;
        this.parseValue = parseValue;
        return parseValue;
    }

    toValue(parseValue) {
        return this.rule.props.maxLength != 1
            ? parseValue
            : (parseValue[0] === undefined
                ? ''
                : parseValue[0]);
    }

    watchValue(n) {
        super.watchValue(n);
        this.render.onChange(n);
        this.render.sync();
    }

    watchFormValue(n) {
        super.watchFormValue(n);
        this.parseValue = n;
        this.render.sync();

    }
}
