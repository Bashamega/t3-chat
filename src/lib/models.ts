interface FullModel extends Model {
  pricing: {
    prompt: string;
    completion: string;
  };
}
export async function getFreeModels(): Promise<Model[]> {
  const response = await fetch("https://openrouter.ai/api/v1/models/", {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch models");
  }

  const models: { data: FullModel[] } = await response.json();
  return models.data
    .filter(
      (model) => Number(model.pricing?.prompt) === 0 && Number(model.pricing?.completion) === 0
    )
    .map((model) => ({
      id: model.id,
      name: model.name.replace(" (free)", ""),
      description: model.description,
    }));
}
