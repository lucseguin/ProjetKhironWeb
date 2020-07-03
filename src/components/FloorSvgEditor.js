import React, { Component,createRef } from 'react';
import './FloorSvgEditor.css';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE} from 'react-svg-pan-zoom';
import ConfirmDialog from "./ConfirmDialog"
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

class FloorSvgEditor extends Component {
  constructor(props){
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.deleteClickedBed = this.deleteClickedBed.bind(this);
    this.editSelectionBeds = this.editSelectionBeds.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.addNewBeds = this.addNewBeds.bind(this);

    this.svgRef = createRef();
    this.confirmDlgRef = createRef();
  }

  state = {
    selectedBedID: null,
    clickedBedID: null,
    dragStart: null,
    beds: [],
    selectedBed: null,
    modified:false,

    tool: TOOL_NONE, 
    svgZoomPanValue: INITIAL_VALUE,
  };
  Viewer = null;

  clearAllBeds(e) {
    this.setState({
      beds: [],
    });
  }

  genBedID(matches,pattern) {
    let str = [...pattern].join("");
    for(let i = 0; i < matches.length; i++) {
      str = str.replace(matches[i][0], matches[i].cnt);
    }
    return str;
  }


  incrementMatchesCount(index, matches){
    if(index >= 0){
      matches[index].cnt++;
      if(matches[index].cnt > matches[index].max) {
        matches[index].cnt = matches[index].min;
        matches = this.incrementMatchesCount(index-1, matches);
      }
    }
    return matches;
  }

  addNewBeds(pattern, count) {
    let newBeds = []
    let matches = [];
    const regexp = RegExp('\\[[0-9]-[0-9]\\]','g');
    let array = [...pattern.matchAll(regexp)];
    array.forEach(match => {
        let minMaxVals = match[0].replace("[","").replace("]","").split("-");
        matches.push({...match, min:parseInt(minMaxVals[0]), max:parseInt(minMaxVals[1]), cnt:parseInt(minMaxVals[0])});
    });

    for(let i = 0; i < count; i++){
      let bedId = this.genBedID(matches, pattern);
      //console.log(bedId);

      newBeds.push({
        id: ""+ Date.now() + bedId,
        label: bedId,
        x : 10+(i*30) + (i*10),
        y : 20 + (i%2*50),
        w : 30,
        h : 50,
        rot:0,
      })

      matches = this.incrementMatchesCount(matches.length-1, matches);
    }

    this.setState({
      beds: [...this.state.beds, ...newBeds],
      modified:true,
    });
  }

  componentDidMount () {
    try {
      this.Viewer.fitToViewer();
      //this.setState(JSON.parse(localStorage.getItem("canvas")));
      document.addEventListener("keyup", this.handleKeyUp, false);
    } catch (err) {
      console.warn("Failed to restore state", err);
    }
  }
  componentWillUnmount(){
    document.removeEventListener("keyup", this.handleKeyUp, false);
  }
  componentDidUpdate () {
    //localStorage.setItem("canvas", JSON.stringify(this.state));
  }
  
  //svg-pan-zoom
  changeTool(nextTool) {
    this.setState({tool: nextTool})
  }

  changeValue(nextValue) {
    this.setState({svgZoomPanValue: nextValue})
  }

  fitToViewer() {
    this.Viewer.fitToViewer()
  }

  editSelectionBeds(bedsToEdit) {
    this.setState({
      beds: [...bedsToEdit], //make a copyß
      selectedBedID:null,
      selectedBed:null,
      modified:false,
    });
  }

  handleMouseDownObj (obj, action, e) {
    //console.log("[FloorSvgEditor]] handleMouseDownObj");

      this.setState({
        selectedBedID: obj._id,
        action: action,
        clickedBedID: null,
        dragStart: {
          x: e.clientX,
          y: e.clientY
        }
      });
  }

  handleMouseUpObj (obj, e) {
    const { beds } = this.state;
    const selectedBedIndex = beds.findIndex(o => o._id === obj._id);
    this.setState(
      {clickedBedID: obj._id,
       selectedBed:beds[selectedBedIndex],
    });
  }

  handleKeyUp(e) {
    const { clickedBedID } = this.state;
    if(e.keyCode === 8 && clickedBedID ) {
      this.confirmDlgRef.current.showDialog();
    }
  }
  handleSelectedBedLabelChange(e) {
    const { beds, clickedBedID } = this.state;
    const selectedBedIndex = beds.findIndex(o => o._id === clickedBedID);
    const selectedBed = beds[selectedBedIndex];
    selectedBed.label = e.target.value;
        this.setState({
          beds: [
            ...beds.slice(0, selectedBedIndex),
            {
              ...selectedBed,
            },
            ...beds.slice(selectedBedIndex + 1)
          ],
          selectedBed: selectedBed,
          modified:true,
        });
  }

  deleteClickedBed(){
    const { beds, clickedBedID } = this.state;
    const selectedBedIndex = beds.findIndex(o => o._id === clickedBedID);
    this.setState({
      clickedBedID :null,
      selectedBed:null,
      beds: [
        ...beds.slice(0, selectedBedIndex),
        ...beds.slice(selectedBedIndex + 1)
      ],
      modified:true,
    });
  }
  
  handleMouseUp (e) {
    //console.log("[FloorSvgEditor]] handleMouseUp");

    const { selectedBedID } = this.state;

    this.setState({
      selectedBedID: null,
      action:null,
    });

    if(!selectedBedID) {
      this.setState({
        clickedBedID: null,
        selectedBed:null,
      });
    }
  }

  handleMouseDown (e) {
    // const { shiftKey } = e;
    // const { x: xStart, y: yStart } = this.getCoords(e);
    //console.log("[FloorSvgEditor]] handleMouseDown"); 
  }

  handleMouseMove (e) {
    const { selectedBedID, dragStart, action, beds } = this.state;

    if(selectedBedID && dragStart){
      const { x: xDragStart, y: yDragStart } = dragStart;
      const { clientX: xDragEnd, clientY: yDragEnd } = e.originalEvent;
      const xDelta = xDragEnd - xDragStart;
      const yDelta = yDragEnd - yDragStart;

      this.setState({
        dragStart: {
          x: xDragEnd,
          y: yDragEnd
        }});
      
      const {svgZoomPanValue} = this.state;
      const selectedBedIndex = beds.findIndex(o => o._id === selectedBedID);
      const selectedBed = beds[selectedBedIndex];
      if(xDelta !== 0 || yDelta !== 0){
        if (action==="move") {
          //this.props.onBedPositionChange(selectedBedID,xDelta,yDelta,0)
          this.setState({
            beds: [
              ...beds.slice(0, selectedBedIndex),
              {
                ...selectedBed,
                x: selectedBed.x + (xDelta/svgZoomPanValue.a),
                y: selectedBed.y + (yDelta/svgZoomPanValue.a),
              },
              ...beds.slice(selectedBedIndex + 1)
            ],
            modified:true,
          });
        } else if (action==="rotate") {
          this.setState({
            beds: [
              ...beds.slice(0, selectedBedIndex),
              {
                ...selectedBed,
                rot: selectedBed.rot + xDelta,
              },
              ...beds.slice(selectedBedIndex + 1)
            ],
            modified:true,
          });
        }
      }
    }
  }

  renderBed (bed) {
    let totalHeight = bed.h * this.props.bedSize;
    let totalWidth = bed.w * this.props.bedSize;
    let pillowHeight = totalHeight * 0.25;
    let restBedHeight = totalHeight - pillowHeight - 2;
    let fullItemRender;
    
    let bedRender = <g key={bed._id}  className="bed"
      x={bed.x}
      y={bed.y}
      width={totalWidth}
      height={totalHeight}
      onMouseDown={this.handleMouseDownObj.bind(this, bed, "move")}
      onMouseUp={this.handleMouseUpObj.bind(this, bed)} >
      <rect
        x={bed.x}
        y={bed.y}
        rx={5} ry={5}
        width={totalWidth}
        height={pillowHeight}
        fill="blue" />
      <rect
        x={bed.x}
        y={bed.y+pillowHeight+2}
        width={totalWidth}
        height={restBedHeight}
        fill="blue" />
        {/* <text x={bed.x+totalWidth/2} y={bed.y + totalHeight/2 + (12*this.props.bedSize/3)} textAnchor={"middle"} fontWeight={"bolder"} fill={"yellow"} style={{fontSize:12*this.props.bedSize, writingMode: 'tb', glyphOrientationVertical: 180}}>{bed.label}</text> */}
        <text x={bed.x+totalWidth/2} y={bed.y} textAnchor={"middle"} fontWeight={"bolder"} style={{fontSize:12*this.props.bedSize}}>{bed.label}</text>
    </g>;

    let bedSelectors;
    
    if(this.state.clickedBedID === bed._id){
      bedSelectors = [<rect
      x={bed.x-3}
      y={bed.y-3}
      width={6}
      height={6}
      fill="black" 
      key={bed._id+"-nw"}
      onMouseDown={this.handleMouseDownObj.bind(this, bed, "rotate")}
      onMouseUp={this.handleMouseUpObj.bind(this, bed)} />,
      // <path fill="none" stroke="red" d={"M"+(x-6)+","+(y+6)+" C"+(x-10)+","+(y-10)+" "+(x+6)+","+(y-6)+" "+(x+6)+","+(y-6)} />,
      // <polygon points={""+(x-9)+","+(y+6)+ " "+(x-3)+","+(y+6)+ " "+(x-6)+","+(y+12)} fill="red" stroke="red" />,
      <rect
      x={bed.x-3}
      y={bed.y+totalHeight-3}
      width={6}
      height={6}
      fill="black" 
      key={bed._id+"-sw"}
      onMouseDown={this.handleMouseDownObj.bind(this, bed, "rotate")}
      onMouseUp={this.handleMouseUpObj.bind(this, bed)}/>,
      <rect
      x={bed.x+totalWidth-3}
      y={bed.y-3}
      width={6}
      height={6}
      fill="black" 
      key={bed._id+"-ne"}
      onMouseDown={this.handleMouseDownObj.bind(this, bed, "rotate")}
      onMouseUp={this.handleMouseUpObj.bind(this, bed)}/>,
      <rect
      x={bed.x+totalWidth-3}
      y={bed.y+totalHeight-3}
      width={6}
      height={6}
      fill="black" 
      key={bed._id+"-se"}
      onMouseDown={this.handleMouseDownObj.bind(this, bed, "rotate")}
      onMouseUp={this.handleMouseUpObj.bind(this, bed)}/>,
      ];
    } 


    if(bed.rot && bed.rot !== 0){
      fullItemRender = <g key={bed._id+"-rot"} transform={"rotate("+bed.rot+" "+(bed.x+(bed.w * this.props.bedSize/2))+" "+(bed.y+(bed.h * this.props.bedSize /2))+")"}>
        {[bedRender,bedSelectors]}
      </g>;
    } else {
      fullItemRender = [bedRender, bedSelectors];
    }

    return (
      fullItemRender
    );
  }

  getUpdateSpinnerEL() {
    if(this.Viewer && this.Viewer.ViewerDOM)
      return this.Viewer.ViewerDOM;
    else
      return this.Viewer;
  }
  render () {
    const {beds, selectedBed, modified} = this.state;
    return (
      <div
          width={this.props.width}
         height={this.props.height}
         key="floor-editor-div"
         id="floor-editor-div"
        >
        
        <ConfirmDialog 
          ref={this.confirmDlgRef}
          title="Supprimer lit" 
          message="Etes-vous certain de vouloir supprimer ce lit?" 
          cancelLabel="Annuler"
          confirmLabel="Supprimer"
          onConfirm={this.deleteClickedBed}
          />
       
        <ReactSVGPanZoom
          id="ReactSVGPanZoomCtrl"
          width={this.props.width} height={this.props.height}
          ref={Viewer => this.Viewer = Viewer}
          tool={this.state.tool} onChangeTool={tool => this.changeTool(tool)}
          value={this.state.svgZoomPanValue} onChangeValue={value => this.changeValue(value)}
          detectAutoPan={false}
          onMouseDown={event => this.handleMouseDown(event)}
          onMouseUp={event => this.handleMouseUp(event)}
          onMouseMove={event => this.handleMouseMove(event)}
        >
          <svg id="floorPlanSvg"
              ref={this.svgRef}
              viewBox={this.props.viewBox}
              width="1200"
              height="800"
              >
            {(this.props.layout !== '')?
            <image x="0" y="0" width="1200" height="800" href={require("../assets/testfloor1.svg")} />:null}
            {beds.map(o => {
                return this.renderBed(o);
            })}
          </svg>
        </ReactSVGPanZoom>

        <Popover
          anchorEl={this.getUpdateSpinnerEL.bind(this)}
          open={this.props.loading}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column">
            <Grid item>
             <CircularProgress />
            </Grid>
            <Grid item>
              <Typography>Loading beds...</Typography>
            </Grid>
          </Grid>
      </Popover>

        <Paper>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item >
              {selectedBed?
              <TextField id="edit-bed-id" label="Identifiant du lit" value={selectedBed.label} onChange={event => this.handleSelectedBedLabelChange(event)} style={{ width: '300px' }}/>
              :
              <TextField id="edit-bed-id-dis" label="Identifiant du lit" disabled value="" style={{ width: '300px' }}/>
              }
            </Grid>
            <Grid item >
            {modified ?
              <Button  variant="contained" color="primary" >
                Sauvegarder
              </Button>
              :
              <Button  id="save-btn-diss" variant="contained" color="primary" disabled>
                Savegarder
              </Button>
            }
              </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}
export default FloorSvgEditor;