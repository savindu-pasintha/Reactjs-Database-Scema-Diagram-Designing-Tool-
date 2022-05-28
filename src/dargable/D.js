import React, { useEffect, useState } from 'react'
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import './D.css';

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
  },]);
  const [change, setChange] = useState('1');
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
        onClick={() => { alert(columdata?.colum); }}
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
    setChange(Math.random(200));
  }
  //Left side editable box
  const removeLeftTableWhenClick = (table) => {
    var arr = tblNameList.filter(function (ele) { return ele != table; });
    setTblNameList(arr);
    alert(`Delete Table : ${table}`);
    setChange(Math.random(200));
  }
  const removeLeftColumWhenClick = (col) => {
    var arr = addColumArr.filter(function (ele) {
      var { colum, type, N, indenty, auto } = ele;
      if (colum != col?.colum) {
        return col;
      }
    });
    setAddColumArr(arr);
    alert(`Delete Colum : ${col?.colum}`);
    setChange(Math.random(200));
  }
  const changeColumValues = (colum_name, value) => {
    var arr = addColumArr;
    arr = addColumArr.filter((ele) => {
      if (colum_name == ele.colum) {
        ele.colum = value;
        return ele;
      }
    });
    // setAddColumArr(arr);
    setChange(Math.random(200));
    //setColData({ ...colData, colum: e.target.value });
  }
  const styles = {
    input: {
      width: '30px'
    }
  }
  const sampleColume = (colum_data) => (
    <div
      className='sampleColume'
      style={{
        paddingTop: "5px", paddingBottom: "2px",
        display: 'flex', float: 'inherit'
      }}>
      <div>
        <input
          style={styles.input}
          value={colum_data?.colum}
          onChange={(e) => { changeColumValues(colum_data?.colum, e.target.value); }}
          placeholder="Colum name" />
      </div>
      <div>
        <input
          style={styles.input}
          value={colum_data?.type}
          onChange={(e) => {
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
        <input
          style={styles.input}
          value={colum_data?.N}
          onChange={(e) => {
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
        <input
          style={styles.input}
          value={colum_data?.indenty}
          onChange={(e) => {
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
        <input
          style={styles.input}
          value={colum_data?.auto}
          onChange={(e) => {
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
        <button
          style={{ backgroundColor: 'red' }}
          onClick={() => { removeLeftColumWhenClick(colum_data); }}>x</button>
      </div>
    </div>
  );
  const addNewColum = () => {
    var arr = addColumArr; arr.push({ colum: `col ${addColumArr?.length + 1}`, type: 'Int', auto: 'Non', indenty: 'Auto Increment' });
    setAddColumArr(arr);
    setChange(Math.random(200));
  }
  const tableCols = (item) => (
    <div
      style={{
        padding: '10px',
      }}
    >
      <div
        style={{
          height: 'auto', padding: '10px',
          display: 'block', border: '1px solid black'

        }}
      >
        <div>
          <h>Table Name : {item}</h>{' '}
          <button
            style={{ backgroundColor: 'red' }}
            onClick={() => { removeLeftTableWhenClick(item); }}>X</button>
        </div>
        <>{addColumArr.map((columdata) => sampleColume(columdata))}</>
        <div>
          <button>Add Index</button>
          <button onClick={() => { addNewColum(); }}>Add Colum</button>

        </div>
      </div>
    </div>
  );
  //tblNameList, addColumArr, 
  useEffect(() => { }, [change]);

  return (
    <div style={{ width: '100%', display: 'block' }}>
      <div style={{ minHeight: window.innerHeight, width: '100%', display: 'flex' }}>

        {/**Right Table boxed */}
        <div style={{ width: '50%', display: 'flex', backgroundColor: "white" }}>
          <div>
            {/** Table Add */}
            <div style={{ display: 'block' }}>
              <input onChange={(event) => {
                setTblName(event.target.value);
                //setChange(true ? false : true); 
              }}
                placeholder="table 1" />
              <button onClick={() => { addTable(tblName); }}>Add Table</button>
            </div>

            {/** Table List Colums */}
            <br />
            <div style={{ display: 'block', }}>
              {
                <>
                  {
                    tblNameList.map((item) => {
                      return (
                        <div key={item}>
                          <div>
                            <div> {tableCols(item)}</div>
                          </div>
                        </div>
                      )
                    })

                  }
                </>
              }
            </div>
          </div>
        </div>


        {/** Left Diagram boxes */}
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
