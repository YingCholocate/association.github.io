import React from 'react'

export default function Tanweitable() {

    return (
        <div>
            {Editable ?
                <Form onFinish={tableonFinish}>
                    <Form.Item name="table">
                        <table className={style.tablestyle}>
                            <thead className={style.theadstyle}>
                                <tr>
                                    
                                    {
                                        coldata ?
                                            (coldata.map((item, index) => {
                                                return <th key={index}>
                                                    {item.title}

                                                </th>
                                            }))
                                            : <th></th>
                                    }
                                    {/* {<th>编辑</th>} */}
                                </tr>

                            </thead>
                            <tbody>

                                {

                                    importExcel ?
                                        (importExcel.map((items, row) => {
                                            return <tr key={row + items}>

                                                {

                                                    Object.keys(items).map((keys, col) => {
                                                        if (keys !== 'key') {
                                                            let cindex

                                                            coldata.map((c, i) => {
                                                                if (c.title === keys) {

                                                                    cindex = i
                                                                }
                                                            })

                                                            return (
                                                                <td key={keys + col}>
                                                                    {
                                                                        (coldata[cindex].type === 'select') ?
                                                                            title === '普通活动人员安排' || !person[row] ?
                                                                                // coldata[col].title === '成员' ?
                                                                                <Select
                                                                                    tagRender={tagRender}
                                                                                    mode="multiple"
                                                                                    allowClear
                                                                                    style={{ width: '100%' }}
                                                                                    placeholder="Please select"
                                                                                    onChange={handleselectChange}
                                                                                    defaultValue={items[coldata[cindex].title] ? items[coldata[cindex].title] : undefined}
                                                                                    name={[row, col]}
                                                                                    autoClearSearchValue={true}
                                                                                    ref={selectRef}
                                                                                >
                                                                                    {userdata.map((item, index) => {
                                                                                        return <Option name={[items.key, coldata[cindex].title]} key={index} >
                                                                                            {item}
                                                                                        </Option>
                                                                                    })}
                                                                                </Select>
                                                                                :
                                                                                <Select
                                                                                    tagRender={tagRender}
                                                                                    mode="multiple"
                                                                                    allowClear
                                                                                    style={{ width: '100%' }}
                                                                                    placeholder="Please select"
                                                                                    onChange={handleselectChange}
                                                                                    name={[row, col]}
                                                                                    defaultValue={tanweidefault}
                                                                                >
                                                                                    {console.log("tanweidefault", tanweidefault)}
                                                                                    {person[row].map((item, index) => {
                                                                                        return <Option name={[items.key, coldata[cindex].title]} key={index} >
                                                                                            {item}
                                                                                        </Option>
                                                                                    })

                                                                                    })
                                                                                </Select>
                                                                            :
                                                                            <div ref={inputEl} className={style.tableinput} name={[items.key, coldata[cindex].title]} suppressContentEditableWarning contentEditable="true" onInput={(e) => handletextchange(e)}>
                                                                                {/* {console.log(items[keys])} */}
                                                                                {items[keys] ? <div>{items[keys]}</div> : <p>{items[keys]}</p>}
                                                                            </div>

                                                                    }

                                                                </td>)
                                                        }


                                                    })
                                                }
                                                {/* {
                          // <td><input type="reset"></input></td>
                          <td><Popconfirm title="Sure to delete?" onConfirm={(e) => handleDelete(e, items.key)}>
                            <a>Delete</a>
                          </Popconfirm></td>
                        } */}
                                            </tr>

                                        }))
                                        :
                                        <tr><td>空</td></tr>
                                }

                            </tbody>
                        </table>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>

                    {/* <input type="reset"onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                // handleAddcolumn(values);
                console.log(form.getFieldsValue())
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
            }}></input> */}
                </Form> :

                <Table className={style.tablestyle} columns={columns} dataSource={[...importExcel]} pagination={false}></Table>}
        </div>

    )
}
