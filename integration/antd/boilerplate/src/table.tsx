import React from 'react';
import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Data',
    dataIndex: 'data',
    key: 'data',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <>
        {tags.map((tag: string) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: { name: string }) => (
      <Space size="middle">
        <span>Invite {record.name}</span>
        <span>Delete</span>
      </Space>
    ),
  },
];

export default (props: { data: any }) => {
  return <Table columns={columns} dataSource={props.data} loading={!props.data || !props.data.length} />;
}