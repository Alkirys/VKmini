import React, {CSSProperties} from 'react';

interface ItemProps {
    key: string,
    index: number,
    padding: number,
    dimensions:  {
        height: number,
        width: number | string,
        gridWidth: number,
        itemsPerRow: number,
    },
    data: JSX.Element,
}

export default class Item extends React.Component<ItemProps> {
    constructor(props: ItemProps) {
        super(props);
    }

    _itemTop() {
        return Math.floor(this.props.index / this.props.dimensions.itemsPerRow) * this.props.dimensions.height;
    }

    // RENDER

    render() {
        const _style = {
            width: '100%',
            height: this.props.dimensions.height,
            left: '0',
            top: this._itemTop(),
            position: 'absolute'
        } as CSSProperties;

        return (
            <div className="item" style={_style}>
                <div>{this.props.data}</div>
            </div>
        );
    }
}
