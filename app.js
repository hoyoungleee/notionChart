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
        .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
        .range([0, width]);

    const timelineY = height / 2;

    // 타임라인 선 그리기
    svg.append("line")
        .attr("x1", 0)
        .attr("y1", timelineY)
        .attr("x2", width)
        .attr("y2", timelineY)
        .attr("stroke", "green")
        .attr("stroke-width", 2);

    const timeline = svg.selectAll(".timeline-item")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "timeline-item");

    // 점(원) 그리기
    timeline.append("circle")
        .attr("cx", d => xScale(d.date))
        .attr("cy", timelineY)
        .attr("r", 5) // 원의 반지름
        .attr("fill", (d, i) => {
            const colors = ["#ffc107", "#007bff", "#28a745", "#dc3545", "#6f42c1", "#e83e8c", "#fd7e14", "#20c997", "#6610f2"];
            return colors[i % colors.length];
        });

    // 텍스트 배치
    timeline.append("text")
        .attr("x", d => xScale(d.date))
        .attr("y", timelineY - 10)
        .text(d => d.label)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "ideographic")
        .attr("transform", d => {
            const x = xScale(d.date);
            const y = timelineY - 10;
            return `rotate(-45, ${x}, ${y})`;
        })
        .style("font-size", "12px")
        .style("font-family", "sans-serif")
        .style("fill", "black");

    // x축(날짜) 추가
    const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat("%Y-%m-%d"));

    svg.append("g")
        .attr("transform", `translate(0, ${timelineY + 5})`)
        .call(xAxis);
});