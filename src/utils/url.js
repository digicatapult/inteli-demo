export const getCurrentBaseUrl = () => {
  const { protocol, hostname, port } = window.location

  return `${protocol}//${hostname}:${port ? port : ''}`
}
