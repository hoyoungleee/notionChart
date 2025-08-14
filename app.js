document.addEventListener("DOMContentLoaded", function() {
    const data = [
        { label: '대학교 교양수업으로 Java 배우기', startDate: new Date(2000, 0, 1), endDate: new Date(2000, 0, 2) },
        { label: '2017년 춘계학술발표대회 학부생 논문경진대회 – 금상', startDate: new Date(2000, 0, 2), endDate: new Date(2000, 0, 3) },
        { label: 'Unity를 활용한 VR/AR 교육 (160시간)', startDate: new Date(2000, 0, 3), endDate: new Date(2000, 0, 4) },
        { label: 'JAVA 웹개발 스택 교육과정 수료', startDate: new Date(2000, 0, 4), endDate: new Date(2000, 0, 5) },
        { label: '운 좋게 바로 JAVA 개발자로 취뽀 성공', startDate: new Date(2000, 0, 5), endDate: new Date(2000, 0, 6) },
        { label: '웹 개발의 처음과 끝을 완성해보다.', startDate: new Date(2000, 0, 6), endDate: new Date(2000, 0, 7) },
        { label: '나라는 존재를 개발 세상에 알리는 중!', startDate: new Date(2000, 0, 7), endDate: new Date(2000, 0, 8) }
    ];

    const width = 1000;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 50, left: 20 };

    const svg = d3.select("#timeline-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleTime()
        .domain([d3.min(data, d => d.startDate), d3.max(data, d => d.endDate)])
        .range([0, width]);

    const rectHeight = 30;
    const rectY = height / 2 - rectHeight / 2;

    const timeline = svg.selectAll(".timeline-rect")
        .data(data)
        .enter()
        .append("g");

    timeline.append("rect")
        .attr("class", "timeline-rect")
        .attr("x", d => xScale(d.startDate))
        .attr("y", rectY)
        .attr("width", d => xScale(d.endDate) - xScale(d.startDate))
        .attr("height", rectHeight)
        .attr("fill", "steelblue"); // 기본 색상

    timeline.append("text")
        .attr("class", "timeline-text")
        .attr("x", d => xScale(d.startDate) + (xScale(d.endDate) - xScale(d.startDate)) / 2)
        .attr("y", rectY + rectHeight / 2)
        .text(d => d.label)
        .attr("transform", d => {
            const x = xScale(d.startDate) + (xScale(d.endDate) - xScale(d.startDate)) / 2;
            const y = rectY + rectHeight / 2;
            return `rotate(45, ${x}, ${y})`;
        });

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat("%Y-%m-%d"));

    svg.append("g")
        .attr("transform", `translate(0, ${height / 2 + 30})`)
        .call(xAxis);
});