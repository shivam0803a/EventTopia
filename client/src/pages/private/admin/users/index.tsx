import { useEffect, useState } from "react";

import { getAllUsers, updateUserData } from "../../../../api-service/user-services";
import { message, Table } from "antd";
import { getDateTimeFormat } from "../../../../helper/date-time-formates";
import PageTitle from "../../../../components/page-title";
import { UserType } from "../../../../interfaces";

function UsersPage() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error: any) {
      message.error(error.response.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (data: any) => {
    try {
      setLoading(true);
      updateUserData(data);
      message.success("User Updated Successfully");
      getData();
    } catch (error:any) {
      message.error(error.response.data.message ||error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      Key: "email",
    },
    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean, row: UserType) => {
        return (
          <select
            value={isAdmin ? "admin" : "user"}
            className="border border-solid border-gray-600"
            onChange={(e) => {
              const isAdminUpdated = e.target.value === "admin";
              updateUser({ userId: row._id, isAdmin: isAdminUpdated });
            }}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        );
      },
    },

    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isAdmin: boolean, row: UserType) => {
        return (
          <select
            value={isAdmin ? "active" : "blocked"}
            className="border border-solid border-gray-600"
            onChange={(e) => {
              const isActiveUpdated = e.target.value === "active";
              updateUser({ userId: row._id, isActive: isActiveUpdated });
            }}
          >
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        );
      },
    },
  ];
  return (
    <div>
      <PageTitle title="Users" />
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
}

export default UsersPage;
