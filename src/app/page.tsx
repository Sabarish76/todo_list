"use client";
import { Button, Form, Input, Modal, Select, Space, Table } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData]: any = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask]: any = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/tasks`);
      console.log(response);
      const taskData = response?.data?.data?.tasks;
      console.log("taskData", taskData);
      setTaskData(taskData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log("values", values);

      if (currentTask) {
        const { key, rest } = currentTask;
        const variables = {
          id: key,
          set: { ...values },
        };
        await axios.put(`/api/tasks`, { variables });
      } else {
        await axios.post(`/api/tasks`, { input: values });
      }
      setIsModalOpen(false);
      setLoading(false);
      form.resetFields();
      await getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setCurrentTask(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "task_name",
      key: "task_name",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            {" "}
            <Button type="link" onClick={() => onEdit(record)}>
              Edit
            </Button>
            <button onClick={() => onDelete(record)}>Delete</button>
          </Space>
        );
      },
    },
  ];

  const transformedData = taskData?.map((e: any) => {
    return {
      key: e?.id,
      task_name: e?.task_name || "-",
      priority: e?.priority || "-",
      description: e?.description || "-",
    };
  });

  console.log("transformedData", transformedData);

  const onEdit = (record: any) => {
    console.log("record", record);
    setCurrentTask(record);
    form.setFieldsValue({
      task_name: record?.task_name,
      priority: record?.priority,
      description: record?.description,
    });
    setIsModalOpen(true);
  };

  const onDelete = async (record: any) => {
    setLoading(true);
    try {
      const variables: any = {
        id: record?.key,
      };
      await axios.delete(`/api/tasks`, { data: variables });
      await getTasks();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  return (
    <main className="container">
      <div className="head">
        <h2 className="title">To-Do List</h2>
        <Button type="primary" onClick={showModal}>
          Create Task
        </Button>
      </div>
      <div className="body">
        <Table
          dataSource={transformedData}
          columns={columns}
          loading={loading}
        />
      </div>
      <Modal
        title="Create Task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Task Name"
            name="task_name"
            rules={[
              {
                required: true,
                message: "Please enter the taskname!",
              },
            ]}
          >
            <Input placeholder="enter task name" />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[
              {
                required: true,
                message: "Please select the priority!",
              },
            ]}
          >
            <Select
              placeholder="select priority"
              options={[
                { label: "Easy", value: "easy" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
              ]}
              allowClear
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: false,
                message: "Please enter the description!",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter task description" />
          </Form.Item>
        </Form>
      </Modal>
    </main>
  );
}
