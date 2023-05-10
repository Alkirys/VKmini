import React, {CSSProperties, UIEventHandler} from 'react';
import Item from './item';
import {Property} from 'csstype';

interface InfiniteGridProps {
    itemClassName?: string,
    entries: JSX.Element[],
    height?: number,
    width?: number,
    padding?: number,
    wrapperHeight?: number,
    lazyCallback?: (...a: any) => void,
    renderRangeCallback?: (...a: any) => void,
    buffer?: number,
    yOffset?: number,
}

interface InfiniteGridState {
    initiatedLazyload: boolean,
    minHeight: number | string,
    minItemIndex: number,
    maxItemIndex: number,
    itemDimensions: {
        height: number,
        width: number | string,
        gridWidth: number,
        itemsPerRow: number,
    },
    wrapperHeight: number,
}

export default class InfiniteGrid extends React.Component<InfiniteGridProps, InfiniteGridState> {
    static defaultProps: InfiniteGridProps;
    private scrollOffset: NodeJS.Timeout | undefined;
    private yOffset: number | undefined;
    private wrapperElement: HTMLDivElement | undefined;
    private gridElement: HTMLDivElement | undefined;
    private wasOffsetSet = false;


    initialState() {
        return {
            initiatedLazyload: false,
            minHeight: window.innerHeight,
            minItemIndex: 0,
            maxItemIndex: 100,
            itemDimensions: {
                height: this.itemHeight(),
                width: '100%',
                gridWidth: 0,
                itemsPerRow: 1,
            },
            wrapperHeight: 0,
        };
    }

    constructor(props: InfiniteGridProps) {
        super(props);
        this.state = this.initialState();
        // bind the functions
        this.scrolLis = this.scrolLis.bind(this);
        this.updateItemDimensions = this.updateItemDimensions.bind(this);
        this.resizeListener = this.resizeListener.bind(this);
        this.visibleIndexes = this.visibleIndexes.bind(this);
    }

    // METHODS

    private wrapperStyle(): CSSProperties {
        return {
            maxHeight: '100vh',
            overflowY: 'scroll',
            width: '100%',
            height: '100%',
            WebkitOverflowScrolling: true as unknown as Property.WebkitOverflowScrolling,
        };
    }

    private gridStyle(): CSSProperties {
        return {
            position: 'relative',
            minHeight: this.getGridHeight(),
        };
    }

    private getGridRect() {
        return this.gridElement?.getBoundingClientRect();
        // return this.refs.grid.getBoundingClientRect();
    }

    private getGridHeight() {
        return Math.floor(
            this.props.entries.length / this.state.itemDimensions.itemsPerRow) * this.state.itemDimensions.height;
    }

    private getWrapperRect() {
        return this.wrapperElement?.getBoundingClientRect();
        // return this.refs.wrapper.getBoundingClientRect();
    }

    private visibleIndexes() {
        const itemsPerRow = this.itemsPerRow();

        // The number of rows that the user has scrolled past
        let scrolledPast = (this.scrolledPastRows() * itemsPerRow);
        if (scrolledPast < 0) scrolledPast = 0;

        // If i have scrolled past 20 items, but 60 are visible on screen,
        // we do not want to change the minimum
        let min = scrolledPast - this.props.buffer!;
        if (min < 0) min = 0;

        // the maximum should be the number of items scrolled past, plus some
        // buffer
        const bufferRows = this.numVisibleRows() + this.props.buffer!;
        let max = scrolledPast + (itemsPerRow * bufferRows);
        if (max > this.props.entries.length) max = this.props.entries.length;

        this.setState({
            minItemIndex: min,
            maxItemIndex: max,
        }, () => {
            /* eslint-disable */
            this.lazyCallback();
        });
    }

    private updateItemDimensions() {
        this.setState({
            itemDimensions: {
                height: this.itemHeight(),
                width: this.itemHeight(),
                gridWidth: this.getGridRect()?.width!,
                itemsPerRow: this.itemsPerRow(),
            },
            minHeight: this.totalRows(),
        });
    }

    private itemsPerRow() {
        return 1;
    }

    private totalRows() {
        const scrolledPastHeight = (this.props.entries.length / this.itemsPerRow()) * this.itemHeight();
        if (scrolledPastHeight < 0) return 0;
        return scrolledPastHeight;
    }

    private scrolledPastRows() {
        if (this.props.yOffset && !this.wasOffsetSet) {
            const scrolledPast = Math.floor(this.props.yOffset / this.itemHeight());
            this.wasOffsetSet = true;
            return scrolledPast;
        }
        const rect = this.getGridRect();
        const topScrollOffset = rect?.height! - rect?.bottom!;
        return Math.floor(topScrollOffset / this.itemHeight());
    }

    private itemHeight() {
        return this.props.height ? this.props.height : 0;
    }

    private numVisibleRows() {
        return Math.ceil(this.getWrapperRect()?.height! / this.itemHeight());
    }

    private lazyCallback() {
        if (!this.state.initiatedLazyload &&
            (this.state.maxItemIndex === this.props.entries.length) && this.props.lazyCallback) {
            this.setState({initiatedLazyload: true});
            this.props.lazyCallback(this.state.maxItemIndex);
        }
    }

    private setYOffset() {
        if (this.props.yOffset && this.props.yOffset != this.yOffset) {
            this.yOffset = this.props.yOffset;
            this.wasOffsetSet = false;
            const itemHeight = (this.props.height || 0) + (this.props.padding || 0);
            const scrolledItems = Math.round(this.props.yOffset / itemHeight);
            this.wrapperElement!.scrollTop = scrolledItems * itemHeight;
        }
    }

    // LIFECYCLE

    componentWillMount() {
        window.addEventListener('resize', this.resizeListener);
    }

    componentDidMount() {
        this.wrapperElement = document.getElementById('wrapper') as HTMLDivElement;
        this.gridElement = document.getElementById('grid') as HTMLDivElement;
        this.updateItemDimensions();
        this.visibleIndexes();
        this.setYOffset();
    }

    componentWillReceiveProps(nextProps: Readonly<InfiniteGridProps>) {
        if (nextProps.entries.length > this.props.entries.length) {
            this.setState({
                initiatedLazyload: false,
            });
        }
        // Update these all the time because entries may change on the fly.
        // this.updateItemDimensions();

        // Move to componentDidUpdate
        // this.visibleIndexes();
    }

    componentDidUpdate(prevProps: Readonly<InfiniteGridProps>, prevState: Readonly<InfiniteGridState>) {
        if (typeof this.props.renderRangeCallback === 'function') {
            this.props.renderRangeCallback(this.state.minItemIndex, this.state.maxItemIndex);
        }
        if (this.props.entries.length !== prevProps.entries.length) {
            this.visibleIndexes();
        }
        this.setYOffset();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeListener);
    }

    // LISTENERS

    private scrolLis(event: Event) {
        clearTimeout(this.scrollOffset!);
        this.scrollOffset = setTimeout(() => {
            this.visibleIndexes();
        }, 10);
    }

    private resizeListener(event: Event) {
        if (!this.props.wrapperHeight) {
            this.setState({
                wrapperHeight: window.innerHeight,
            });
        }
        this.updateItemDimensions();
        this.visibleIndexes();
    }

    // RENDER

    render() {
        const entries = [];

        // if no entries exist, there's nothing left to do
        if (!this.props.entries.length) {
            return null;
        }

        for (let i = this.state.minItemIndex; i <= this.state.maxItemIndex; i++) {
            const entry = this.props.entries[i];
            if (!entry) {
                continue;
            }
            const itemProps = {
                key: 'item-' + i,
                index: i,
                padding: this.props.padding!,
                dimensions: this.state.itemDimensions,
                data: entry,
            };
            entries.push(<Item {...itemProps} />);
        }

        const scrollListener = this.scrolLis as unknown as UIEventHandler<HTMLDivElement>;

        return (
            <div className='infinite-grid-wrapper' id="wrapper" onScroll={scrollListener} style={this.wrapperStyle()}>
                <div id="grid" className='infinite-grid' style={this.gridStyle()}>
                    {entries}
                </div>
            </div>
        );
    }
}

const defaultProps = {
    buffer: 15,
    padding: 0,
    entries: [],
    height: 250,
    width: 250,
};

InfiniteGrid.defaultProps = defaultProps as InfiniteGridProps;
