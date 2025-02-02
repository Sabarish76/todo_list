import { NextResponse, NextRequest } from "next/server";
import {
  INSERT_TASK,
  GET_TASKS,
  UPDATE_TASK,
  DELETE_TASK,
} from "@/query/tasks";
import graphQLApi from "@/service/graphQLApi";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    console.log("data", data);
    // const variables = { ...data?.input };
    // console.log("variables", variables);
    // const formattedVariables = { input: variables };
    // console.log("formattedVariables", formattedVariables);

    const apiResponse = await graphQLApi(INSERT_TASK, data);

    console.log("apiResponse", apiResponse);
    console.error("apiResponse.errors", apiResponse?.errors);

    if (apiResponse && apiResponse.data) {
      return NextResponse.json(apiResponse.data);
    } else {
      return NextResponse.json({ error: "response failed", status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "server error", status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const apiResponse = await graphQLApi(GET_TASKS);

    console.log("apiResponse", apiResponse);

    if (apiResponse && apiResponse.data) {
      return NextResponse.json(apiResponse.data);
    } else {
      return NextResponse.json({ error: "response failed", status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "server error", status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    console.log("data", data);
    const { variables } = data;
    console.log("variables", variables);

    const apiResponse = await graphQLApi(UPDATE_TASK, variables);

    console.log("apiResponse", apiResponse);
    console.error("apiResponse.errors", apiResponse?.errors);

    if (apiResponse && apiResponse.data) {
      return NextResponse.json(apiResponse.data);
    } else {
      return NextResponse.json({ error: "response failed", status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "server error", status: 500 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    console.log("data", data);

    const apiResponse = await graphQLApi(DELETE_TASK, data);

    console.log("apiResponse", apiResponse);

    if (apiResponse && apiResponse.data) {
      return NextResponse.json(apiResponse.data);
    } else {
      return NextResponse.json({ error: "response failed", status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "server error", status: 500 });
  }
}
