import { NextResponse } from 'next/server';
import Replicate from 'replicate';

// 创建 Replicate 客户端实例
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(request: Request) {
  const { description } = await request.json();

  try {
    // 调用 Replicate API
    const response = await replicate.run(
      "konieshadow/fooocus-api-anime:a750658f54c4f8bec1c8b0e352ce2666c22f2f919d391688ff4fc16e48b3a28f",
      {
        input: {
          prompt: description,
          cn_type1: "ImagePrompt",
          cn_type2: "ImagePrompt",
          cn_type3: "ImagePrompt",
          cn_type4: "ImagePrompt",
          sharpness: 2,
          image_seed: -1,
          uov_method: "Disabled",
          image_number: 1,
          guidance_scale: 7,
          refiner_switch: 0.66,
          negative_prompt: "(embedding:unaestheticXLv31:0.8), low quality, watermark",
          style_selections: "Fooocus V2,Fooocus Masterpiece,SAI Anime,SAI Digital Art,SAI Enhance,SAI Fantasy Art",
          uov_upscale_value: 0,
          outpaint_selections: "",
          outpaint_distance_top: 0,
          performance_selection: "Speed",
          outpaint_distance_left: 0,
          aspect_ratios_selection: "1152*896",
          outpaint_distance_right: 0,
          outpaint_distance_bottom: 0,
          inpaint_additional_prompt: ""
        }
      }
    );

    // 调试信息：打印完整的响应对象
    console.log("API response:", response);

    // 假设 response 是数组
    if (Array.isArray(response) && response.length > 0 && typeof response[0] === 'string') {
      return NextResponse.json({ imageUrl: response[0] }, { status: 201 });
    } else {
      return NextResponse.json({ error: 'No image URL found in API response.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}