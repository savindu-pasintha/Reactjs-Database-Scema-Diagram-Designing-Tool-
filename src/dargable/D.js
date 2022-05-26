import React, { useEffect, useState } from 'react'
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time

export default function D() {
  const [tbl, setTbl] = useState('');
  const [tblName, setTblName] = useState('');
  const [tblNameList, setTblNameList] = useState([]);
  const [listOfTableComponents, setTableList] = useState(["savindu", "pasintha"]);
  const [colData, setColData] = useState({
    colum: '', type: '', N: '', indenty: '', auto: ''
  });
  const [addColumArr, setAddColumArr] = useState([{
    colum: 'A', type: 'varchar', N: 'Non', indenty: 'primarykey', auto: 'none'
  }, {
    colum: 'B', type: 'String', N: '', indenty: '', auto: ''
  },]);
 // const [update, setUpdate] = useEffect(false);
  //{table:name,colums:{}}

  //Right side Diagram onclick ->load the table to screen
  const tblDiagramSampleColume = (columdata) => (<>
    <div
      style={{
        width: '180px', display: 'flex',
        margin: '0px', backgroundColor: 'green',
        paddingTop: '5px'
      }}>
      <button
        style={{
          width: '150px', display: 'flex',
          height: '30px',
          margin: '0px',
        }}
        onClick={() => { alert("abc") }}
      ><p>{columdata?.colum}......................{columdata?.type}</p></button>
    </div>
  </>);
  const tblDiagram = (itemTblName) =>
    <div id={tblName ? tblName : 'id'}
      style={{
        width: '180px', height: 'auto',
        border: '1px solid black',
        margin: '20px',
      }}>
      <h>Table Name : {itemTblName}</h>
      <>
        {
          addColumArr.map((columdata) => tblDiagramSampleColume(columdata))
        }
      </>
    </div>
    ;
  const addTable = (tableName) => {
    var arr = tblNameList;
    arr.push(tableName);
    setTblNameList(arr);
  }
  //Left side editable box
  const sampleColume = (columdata) => (
    <div style={{ paddingTop: "5px", paddingBottom: "2px" }}>
      <div>
        <input onChange={(e) => { setColData({ ...colData, colum: e.target.value }); }} placeholder="Colum name" />
      </div>
      <div>
        <input onChange={(e) => {
          setColData({ ...colData, type: e.target.value });
        }} placeholder="Data type"
          list="browsers" name="browser" id="browser"
        />
        <datalist id="browsers">
          <option value="Edge" />
          <option value="Firefox" />
          <option value="Chrome" />
          <option value="Opera" />
          <option value="Safari" />
        </datalist>
      </div>
      <div>
        <input onChange={(e) => {
          setColData({ ...colData, N: e.target.value });
        }} placeholder="N/NN"
          list="nn" name="nn" id="nn"
        />
        <datalist id="nn">
          <option value="null" />
          <option value="not null" />
        </datalist>
      </div>
      <div>
        <input onChange={(e) => {
          setColData({ ...colData, indenty: e.target.value });
        }} placeholder="Identity"
          list="pk" name="pk" id="pk"
        />
        <datalist id="pk">
          <option value="primary" />
          <option value="uniuqe" />
        </datalist>
      </div>
      <div>
        <input onChange={(e) => {
          setColData({ ...colData, auto: e.target.value });
        }} placeholder="Auto incerent"
          list="auto" name="auto" id="auto"
        />
        <datalist id="auto">
          <option value="Auto increment" />
          <option value="None" />
        </datalist>
      </div>
      <div>
        <button onClick={() => { alert(`Delete Colum : ${columdata?.colum}`); }}>x</button>
      </div>
    </div>
  );
  const tableCols = (item) => (
    <div>
      <div>
        <div>
          <h>Table Name : {item}</h>{' '}
          <button onClick={() => { alert(`Delete Table : ${item}`); }}>X</button>
        </div>
        <>{addColumArr.map((columdata) => sampleColume(columdata))}</>
        <div>
          <button>Add Index</button>
          <button onClick={() => {
            var arr = addColumArr; arr.push({ colum: "c1", type: 't1' });
            setAddColumArr(arr);
          }}>Add Colum</button>
        </div>
      </div>
    </div>
  );

  useEffect(() => { }, [tblNameList, addColumArr
  ]);

  return (
    <div style={{ width: '100%', display: 'block' }}>
      <div style={{ minHeight: window.innerHeight, width: '100%', display: 'flex' }}>
        <div style={{ width: '50%', display: 'flex', backgroundColor: "white" }}>
          {/** Table Add */}
          <div style={{ display: 'block' }}>
            <input onChange={(event) => { setTblName(event.target.value); }} placeholder="table 1" />
            <button onClick={() => { addTable(tblName); }}>Add Table</button>
          </div>
          {/** Table List Colums */}
          <br />
          <div style={{ display: 'block' }}>
            {
              tblNameList.map((item) => {
                return (
                  <div
                    style={{
                      height: 'auto', padding: '10px',
                      display: 'block', border: '1px solid black'
                    }}>
                    <div> {tableCols(item)}</div>
                  </div>)
              })
            }
          </div>
        </div>

        <div style={{ width: '50%', display: 'flex', backgroundColor: "white" }}>
          <div>
            {
              tblNameList.map((item, i) => {
                return (<Draggable id={item?.id} key={item?.key}><div>{tblDiagram(item)}</div></Draggable>);
              })
            }
          </div>
        </div>
      </div>
    </div >
  )
}
